import bookIcon from "../assets/book.svg";
import { useApp } from "../contexts/AppContext";
import { useState, useEffect } from "react";
import type { MajorProgress, GroupItemProgress } from "../types/type-program";
import { formatCourseItemTypes } from "../utils/formatHelpers";

interface ClassRequirementMapProps {
  reqProgressGroup: GroupItemProgress;
}

function ClassRequirementMap({ reqProgressGroup }: ClassRequirementMapProps) {
  let requirements: string[] = [];

  requirements = formatCourseItemTypes(reqProgressGroup);

  // Pair requirements with their fulfillment status
  const maxLength = Math.max(
    requirements.length,
    reqProgressGroup.completedNum
  );
  const pairs = [];

  for (let i = 0; i < maxLength; i++) {
    pairs.push({
      requirement: requirements[i] || null,
      fulfillment: reqProgressGroup.courseItems[i]?.completedCourses[0] || null,
    });
  }

  return (
    <ul className="list-disc list-inside mb-4 text-sm text-gray-800">
      <span className="font-semibold">
        {reqProgressGroup.requiredNum == reqProgressGroup.courseItems.length
          ? reqProgressGroup.description
          : `${reqProgressGroup.description} (only ${reqProgressGroup.requiredNum} needed)`}
      </span>
      <ul className="list-disc pl-4 mt-1 space-y-1 text-gray-700">
        {pairs.map((pair, idx) => (
          <li key={idx}>
            {pair.requirement}:{" "}
            {pair.fulfillment?.course ? (
              <span className="text-green-700 font-medium">
                Fulfilled by {pair.fulfillment.course.codes[0]}
              </span>
            ) : (
              <span className="text-red-600 font-medium">Not fulfilled</span>
            )}
          </li>
        ))}
      </ul>
    </ul>
  );
}

function Programs() {
  const { appData } = useApp();
  const [selectedProgram, setSelectedProgram] = useState<MajorProgress | null>(
    null
  );

  useEffect(() => {
    if (appData) {
      const defaultProgram = appData.major_processor.processMajorTemplate(
        appData.major_templates[0]
      );
      setSelectedProgram(defaultProgram);
    }
  }, [appData]);

  if (!appData) return <div>Loading courses and majors...</div>;
  if (!selectedProgram) return <div>Loading program...</div>;

  return (
    <>
      <div className="flex h-full">
        <div
          className="fixed w-72 flex flex-col bg-white border-gray-200 border-r-4 z-10"
          style={{ height: "calc(100vh - var(--navbar-height, 64px))" }}
        >
          <input
            type="text"
            placeholder="Search by major or certificate..."
            className="px-4 py-2 border-b-4 border-gray-200 bg-blue-100 placeholder-shown:bg-white w-full focus:outline-none focus:bg-gray-100
             transition-colors duration-200 ease-in-out border-t-2"
          />
          <div className="overflow-y-auto flex-1 pb-2">
            <ul className="flex flex-col w-full">
              {appData.major_templates.map((major_template, index) => (
                <li key={index}>
                  <div
                    onClick={() =>
                      setSelectedProgram(
                        appData.major_processor.processMajorTemplate(
                          major_template
                        )
                      )
                    }
                    className={`m-0 p-2  cursor-pointer transition-colors duration-200 hover:bg-blue-200 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    {major_template.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ml-72 flex flex-col w-[calc(100vw-18rem)] max-w-none">
          <header className="m-6 mt-4 flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-3xl font-bold text-gray-800">
                Program Viewer
              </h1>
              <img src={bookIcon} alt="pencil icon" className="h-8 w-8 ml-1" />
            </div>
            <p className="text-gray-500 font-medium mt-2">
              Welcome to the Program Viewer page! Search through majors and
              certificates, and add them to your profile!
            </p>
          </header>

          <hr className="border-gray-200 border-t-3" />

          <main className="flex flex-1 flex-row items-stretch gap-6 p-6">
            {/* Left Panel */}
            <section className="basis-1/2 grow min-w-0 h-full flex flex-col bg-white border-2 border-gray-200 p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-800">
                  {selectedProgram.name}
                </h1>
                <span className="text-sm text-gray-500">
                  {selectedProgram.info.abbr}
                </span>
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">
                  {selectedProgram.info.stats.type}
                </span>
              </div>

              {/*<div className="flex items-center gap-3 mt-3">
                <button className="bg-gray-200 text-sm px-3 py-1 rounded">
                  B.A.
                </button>
                <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded">
                  B.S.
                </button>
              </div>*/}

              {/* Stats */}
              <div className="mt-5">
                <h2 className="text-gray-700 font-semibold text-sm mb-2">
                  STATS
                </h2>
                <div className="grid grid-cols-4 text-center text-sm text-gray-600">
                  <div>
                    <p className="text-gray-800 font-bold">
                      {selectedProgram.info.stats.courses}
                    </p>
                    Courses
                  </div>
                  <div>
                    <p className="text-green-600 font-bold">
                      ~{selectedProgram.info.stats.rating}
                    </p>
                    Rating
                  </div>
                  <div>
                    <p className="text-orange-500 font-bold">
                      ~{selectedProgram.info.stats.workload}
                    </p>
                    Workload
                  </div>
                  <div>
                    <p className="text-red-600 font-bold">
                      {selectedProgram.info.degreeType}
                    </p>
                    Type
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="mt-6">
                <h2 className="text-gray-700 font-semibold text-sm mb-2">
                  ABOUT
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {selectedProgram.info.about}
                </p>
              </div>

              {/* DUS + Buttons */}
              <div className="mt-6 text-sm">
                <h2 className="text-gray-700 font-semibold mb-1">
                  Director of Undergraduate Studies
                </h2>
                <div className="text-blue-700 underline">
                  {selectedProgram.info.dus.name.map((n: string, i: number) => (
                    <p key={i}>
                      {n}, {selectedProgram.info.dus.email[i]}
                    </p>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="border rounded px-3 py-1 text-sm">
                    <a href={selectedProgram.info.catalogLink}>MAJOR CATALOG</a>
                  </button>
                  <button className="border rounded px-3 py-1 text-sm">
                    <a href={selectedProgram.info.websiteLink}>MAJOR WEBSITE</a>
                  </button>
                  <button className="border rounded px-3 py-1 text-sm">
                    <a href={`mailto:${selectedProgram.info.majorEmail}`}>
                      MAJOR EMAIL
                    </a>
                  </button>
                </div>
              </div>
            </section>
            {/* Right Panel */}{" "}
            <section className="basis-1/2 grow min-w-0 h-full flex flex-col bg-white p-6 border-2 border-gray-200 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Requirements
                </h2>
              </div>

              {/* Placeholder for Graph */}
              <div className="rounded text-black overflow-auto">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProgram.requirements.map(
                    (reqProgressGroup, index) => (
                      <li key={index} className="m-0.5">
                        <div className="border border-gray-200 rounded-md p-4 bg-gray-50 shadow-sm h-full">
                          <ClassRequirementMap
                            reqProgressGroup={reqProgressGroup}
                          />
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default Programs;
