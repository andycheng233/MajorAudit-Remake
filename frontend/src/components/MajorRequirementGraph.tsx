import {
  type MajorProgress,
  type MajorProgressType,
} from "../types/type-program";

interface ClassRequirementMapProps {
  reqProgressGroup: MajorProgressType;
}

function ClassRequirementMap({ reqProgressGroup }: ClassRequirementMapProps) {
  let requirements: string[] = [];

  switch (reqProgressGroup.type) {
    case "course-requirement":
      requirements = reqProgressGroup.courses.map((item) => {
        if (item.type === "multi") {
          return item.courses.map((course) => course.codes[0]).join(" or ");
        } else {
          return item.courses[0].codes[0];
        }
      });
      break;

    case "group-requirement":
      requirements = reqProgressGroup.courses.map((item) => {
        if (item.type === "multi") {
          return item.courses.map((course) => course.codes[0]).join(" or ");
        } else {
          return item.courses[0].codes[0];
        }
      });
      break;

    case "elective-requirement":
      requirements = Array(reqProgressGroup.requiredNum).fill(
        `${reqProgressGroup.codes[0]} ≥ Level ${reqProgressGroup.minLevel}`
      );
      break;

    case "category-requirement":
      requirements = Array(reqProgressGroup.requiredNum).fill(
        `${reqProgressGroup.category} Course`
      );
      break;

    case "progression-requirement":
      requirements = reqProgressGroup.levelDist.map((item) => {
        return reqProgressGroup.languageCode + " " + item;
      });
      break;

    default:
      window.alert("error");
  }

  // Pair requirements with their fulfillment status
  const maxLength = Math.max(
    requirements.length,
    reqProgressGroup.completedCourses.length
  );
  const pairs = [];

  for (let i = 0; i < maxLength; i++) {
    pairs.push({
      requirement: requirements[i] || null,
      fulfillment: reqProgressGroup.completedCourses[i] || null,
    });
  }

  return (
    <div className="flex flex-col justify-center w-full h-full overflow-hidden">
      {pairs.map((pair, idx) => (
        <div
          key={idx}
          className={`flex-1 p-2 m-2 rounded-md min-h-0 flex items-center justify-center ${
            pair.fulfillment && pair.fulfillment.course
              ? "bg-gray-200 border-gray-300 border-2 text-green-700"
              : "bg-gray-200 border-gray-300 border-2 text-gray-400 border-dashed "
          }`}
        >
          <div className="text-sm text-center overflow-hidden">
            {pair.requirement &&
              (pair.fulfillment && pair.fulfillment.course ? (
                <div>
                  {pair.requirement} fulfilled by{" "}
                  <span className="font-bold ">
                    {pair.fulfillment.course.codes[0]}
                  </span>
                </div>
              ) : (
                <div>{pair.requirement} Required</div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface MajorRequirementGraphProps {
  major_progress: MajorProgress;
}

function MajorRequirementGraph({ major_progress }: MajorRequirementGraphProps) {
  return (
    <div className="flex flex-row h-full w-full overflow-x-auto">
      {major_progress.requirementsProgress.map((reqProgressGroup, index) => (
        <div
          key={index}
          className="bg-gray-100 border-gray-200 border-2 m-1.5 p-1.5 flex-1 min-w-48 min-h-72 flex flex-col"
        >
          <span className="font-medium mb-1 mt-1 text-center flex-shrink-0">
            {reqProgressGroup.description}
          </span>
          <div className="flex-1 min-h-0">
            <ClassRequirementMap reqProgressGroup={reqProgressGroup} />
          </div>
        </div>
      ))}
    </div>
  );
}
export default MajorRequirementGraph;
