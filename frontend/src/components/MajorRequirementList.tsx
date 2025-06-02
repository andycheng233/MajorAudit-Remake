import {
  type MajorRequirement,
  type MajorProgress,
} from "../types/type-program";

import {
  isCourseRequirement,
  isGroupRequirement,
  isLevelRequirement,
  isCategoryRequirement,
  isProgressionRequirement,
} from "../utils/typeCheckHelper";

interface MajorReqListProps {
  major_requirement: MajorRequirement;
  major_progress: MajorProgress;
}

/*function ClassRequirementMap(requirement_group: []) {
  if (requirement_group === "course-requirement") {
  } else if (requirement_group === "group-requirement") {
  } else if (requirement_group === "category-requirement") {
  } else if (requirement_group === "level-requirement") {
  } else if (requirement_group === "progression-requirement") {
  }
}*/

//MAYBE JUST GET RID OF ALL type CHECKS AND REQURIEMENT AND JUST IMPORT ALL TYPES ...

function MajorRequirementsMap(
  major_requirement: MajorRequirement,
  major_progress: MajorProgress
) {
  return (
    <>
      {major_progress.requirementsProgress.map(
        (requirementProgressGroup, index) => {
          const requirementGroup = major_requirement.requirements[index];

          let descriptionText = "";
          if (isCourseRequirement(requirementGroup))
            descriptionText = "Must complete all courses within";
          else if (isGroupRequirement(requirementGroup))
            `Must complete ${requirementGroup.requiredNum} out of ${requirementGroup.courses.length}`;
          else if (isLevelRequirement(requirementGroup))
            descriptionText = `Must complete ${requirementGroup.requiredNum} courses at or above level ${requirementGroup.minLevel}`;
          else if (isCategoryRequirement(requirementGroup))
            descriptionText = `Must complete ${requirementGroup.requiredNum} ${requirementGroup.category} courses`;
          else if (isProgressionRequirement(requirementGroup))
            descriptionText = "Must complete all courses within in progression";

          return (
            <li className="h-16 bg-gray-100 border-gray-200 border-2 rounded-md m-2 p-4 flex flex-col justify-center">
              <div className="flex flex-row gap-4 items-start w-full">
                <div
                  className={`w-6 h-6 border-2 rounded-sm mt-1 shrink-0 ${
                    requirementProgressGroup.finished
                      ? "border-green-500 bg-green-500"
                      : "bg-gray-100 border-red-600"
                  }`}
                ></div>

                <div className="flex flex-col">
                  <span className="font-medium">
                    {requirementProgressGroup.description}
                  </span>
                  <span className="text-sm text-gray-500">
                    {descriptionText}
                  </span>
                </div>
              </div>
            </li>
          );
        }
      )}
    </>
  );
}

function MajorRequirementList({
  major_requirement,
  major_progress,
}: MajorReqListProps) {
  return (
    <>
      <ul className="h-full max-h-110 w-92 bg-white border-gray-200 border-2 m-2 p-2 shadow overflow-y-auto">
        {MajorRequirementsMap(major_requirement, major_progress)}
      </ul>
    </>
  );
}

export default MajorRequirementList;
