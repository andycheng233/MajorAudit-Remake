import os, json, time, re
from typing import List, Dict, Any
import requests
from bs4 import BeautifulSoup
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from tqdm import tqdm

# ---- OpenAI client ----
from openai import OpenAI
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

INDEX_URL = "https://catalog.yale.edu/ycps/majors-in-yale-college/"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; MajorAudit/1.0; +https://example.com)"
}

# Allowed item types per your schema
ALLOWED_ITEM_TYPES = {
    "single-choice", "multi-choice", "combo-choice",
    "range-choice", "level-choice", "category-choice", "designation-choice"
}

# ---- Prompt template for ChatGPT ----
SYSTEM_PROMPT = """You are a strict data converter. You receive raw catalog text for a Yale major page and must output ONLY JSON (no prose) that follows this schema exactly:

MajorTemplate:
{
  "name": "<Major Name + degree (e.g., 'Economics B.A.')>",
  "totalCourses": <int>,
  "totalRequirementGroups": <int>,
  "requirements": [
    {
      "description": "<Group description>",
      "requiredNum": <int>,
      "courseItems": [
        // Use ONLY these allowed course item types:
        // - single-choice: {"type":"single-choice","courseCode":"ECON 1100"}
        // - multi-choice: {"type":"multi-choice","courseCodes":[...]}
        // - combo-choice: {"type":"combo-choice","courseCodes":[...], "countAs": <int>}
        // - range-choice: {"type":"range-choice","subjectCode":[...], "minLevel": <int>,"maxLevel": <int>}
        // - level-choice: {"type":"level-choice","subjectCode":[...], "level": <int>}
        // - category-choice: {"type":"category-choice","category":[...]}
        // - designation-choice: {"type":"designation-choice","category":[...], "subjectCodes":[...]}
      ]
    }
  ]
}

Constraints and notes:
- OUTPUT MUST BE A JSON ARRAY. If the page contains multiple degree variants (e.g., BA & BS), include multiple objects in the array.
- Use only allowed item types. Do not invent new fields or types.
- If the catalog says “choose X from …” -> use multi-choice or combo-choice as appropriate.
- If a requirement is “N courses at level 3000+ in SUBJECT” -> use level-choice with subjectCode and level.
- If it’s a distribution area (e.g., Hu/So/Sc/QR/WR/L1-L5), use category-choice.
- Use designation choice to represent language or designation requirements (such as category: L1, subjectCode: CHNS or category: Hu, subjectCode AFAM)
- If senior essays/projects are specific courses, use single-choice; if there are multiple options, use multi-choice.
- If something is DUS-approved or flexible, pick the closest allowed type and don’t add extra fields.
- totalRequirementGroups = length of "requirements".
- totalCourses = sum of "requiredNum" across the listed requirement groups (as presented in the page's “Number of courses” if explicitly stated; otherwise infer).
- Do NOT add prose, comments, or trailing commas. Return valid JSON only.
"""

USER_PROMPT_TEMPLATE = """CATALOG RAW TEXT (from Yale page):
----------------
{page_text}
----------------

Your task:
- Identify the major(s) and degree variant(s) on this page.
- Return a JSON array of MajorTemplate objects matching the schema above.
- Use only allowed item types.
- Output JSON ONLY (no backticks).
"""

def fetch(url: str) -> str:
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    return r.text

def get_major_links(index_html: str) -> List[str]:
    soup = BeautifulSoup(index_html, "html.parser")
    # The majors page lists links to "Subjects of Instruction" for each program.
    # Many links look like /ycps/subjects-of-instruction/<slug>/
    links = []
    for a in soup.select("a"):
        href = a.get("href", "")
        # Heuristic: include subjects-of-instruction pages only
        if "/ycps/subjects-of-instruction/" in href:
            if href.startswith("/"):
                href = "https://catalog.yale.edu" + href
            if href.endswith("#coursestext"):
                continue
            if href not in links:
                links.append(href)
    return sorted(links)

def extract_relevant_text(page_html: str) -> str:
    """
    Pulls the core content, with a bias toward headings and the Summary of Major Requirements.
    We keep the full body text because ChatGPT will pick out the relevant parts.
    """
    soup = BeautifulSoup(page_html, "html.parser")

    # Main content container (YCPS uses #textcontainer or .sc_sccoursedescs etc.)
    main = soup.select_one("#textcontainer") or soup.select_one("#content") or soup.body

    # Collect text from headings and paragraphs
    chunks = []
    if not main:
        return soup.get_text(" ", strip=True)

    # Prefer to keep structure but plain text is fine
    for el in main.find_all(["h1", "h2", "h3", "p", "ul", "ol", "li", "table"]):
        text = el.get_text(" ", strip=True)
        if text:
            chunks.append(text)

    raw = "\n".join(chunks)

    # Trim excessive whitespace
    raw = re.sub(r"\n{2,}", "\n", raw).strip()
    return raw

@retry(stop=stop_after_attempt(4), wait=wait_exponential(multiplier=1, min=2, max=15),
       retry=retry_if_exception_type(Exception))
def call_chatgpt(page_text: str) -> List[Dict[str, Any]]:
    prompt = USER_PROMPT_TEMPLATE.format(page_text=page_text[:180000])  # safety cap
    resp = client.chat.completions.create(
        model="gpt-5-thinking",  # use your preferred model
        temperature=0.1,
        messages=[
            {"role":"system", "content": SYSTEM_PROMPT},
            {"role":"user", "content": prompt}
        ]
    )
    content = resp.choices[0].message.content.strip()

    # Ensure pure JSON (the system prompt already requests that)
    # Remove stray code fences if any
    content = content.strip()
    if content.startswith("```"):
        content = re.sub(r"^```(?:json)?\s*", "", content)
        content = re.sub(r"\s*```$", "", content)

    data = json.loads(content)
    if not isinstance(data, list):
        raise ValueError("Model did not return a JSON array")
    # Optional sanity checks
    for obj in data:
        if "name" not in obj or "requirements" not in obj:
            raise ValueError("Missing required keys in one object")
        for group in obj.get("requirements", []):
            for item in group.get("courseItems", []):
                t = item.get("type")
                if t not in ALLOWED_ITEM_TYPES:
                    raise ValueError(f"Disallowed type {t}")
    return data

def main():
    print("Fetching majors index...")
    index_html = fetch(INDEX_URL)
    major_links = get_major_links(index_html)
    print(f"Found {len(major_links)} major pages.")

    all_majors: List[Dict[str, Any]] = []
    errors: Dict[str, str] = {}

    for url in tqdm(major_links, desc="Processing majors"):
        try:
            html = fetch(url)
            text = extract_relevant_text(html)
            majors_from_page = call_chatgpt(text)
            all_majors.extend(majors_from_page)
            time.sleep(0.5)  # be gentle
        except Exception as e:
            errors[url] = str(e)
            continue

    # Optional: de-dup by name if any overlap
    seen = {}
    deduped = []
    for m in all_majors:
        key = m.get("name","").strip()
        if key and key not in seen:
            seen[key] = True
            deduped.append(m)

    # Save outputs
    os.makedirs("out", exist_ok=True)
    with open("out/yale_majors.json", "w", encoding="utf-8") as f:
        json.dump(deduped, f, ensure_ascii=False, indent=2)

    if errors:
        with open("out/yale_majors_errors.json", "w", encoding="utf-8") as f:
            json.dump(errors, f, ensure_ascii=False, indent=2)

    print(f"Done. Wrote {len(deduped)} majors to out/yale_majors.json")
    if errors:
        print(f"Encountered {len(errors)} errors. See out/yale_majors_errors.json")

if __name__ == "__main__":
    main()
