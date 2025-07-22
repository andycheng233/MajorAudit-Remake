import {
  type MajorProgress,
  type GroupItemProgress,
} from "../types/type-program";

import { useState } from "react";

interface ClassRequirementMapProps {
  reqProgressGroup: GroupItemProgress;
}

function ClassRequirementMap({ reqProgressGroup }: ClassRequirementMapProps) {
  let requirements: string[] = [];

  requirements = reqProgressGroup.courseItems.map((item) => {
    switch (item.type) {
      case "single-choice":
        return `${item.courseCode}`;
      case "multi-choice":
        // Show as "CPSC 202 or MATH 244 (choose 1)"
        return `${item.courseCodes.join(" or ")}`;

      case "combo-choice":
        // Show as "MATH 1100 + MATH 1110 (counts as 1)"
        return `${item.courseCodes.join(" + ")} (counts as ${item.countAs})`;

      case "range-choice":
        // Show as "2 courses from ECON 4400-4491"
        const subjects = item.subjectCode.join("/");
        return `Course from ${subjects} ${item.minLevel}-${item.maxLevel}`;

      case "level-choice":
        // Show as "Any MATH course ≥ level 2000"
        const subjectCodes = item.subjectCode.join("/");
        return `Course from ${subjectCodes} ≥ level ${item.level}`;

      case "category-choice":
        // Show as "2 Writing Intensive courses"
        const categories = item.category.join("/");
        return `${categories} course`;

      case "language-choice":
        // Show as "2 Spanish language courses from SPAN"
        const langCategories = item.category.join("/");
        const langSubjects = item.subjectCodes.join("/");
        return `${langCategories} course from ${langSubjects}`;

      default:
        console.error(`Unknown course item type`);
        return "Unknown requirement type";
    }
  });

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
    <div className="p-2 mt-2">
      <div className="space-y-3">
        {pairs.map((pair, idx) => (
          <div key={idx} className="relative">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-300 "></div>

            <div className="ml-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm pt-2">
              {pair.requirement && (
                <div className="mb-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Requirement
                  </span>
                  <div className="text-sm text-gray-700 mt-1 flex items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-2 flex-shrink-0"></span>
                    {pair.requirement}
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Status
                </span>
                <div className="text-sm mt-1 flex">
                  {pair.fulfillment && pair.fulfillment.course ? (
                    <>
                      <span className="w-2 h-2 bg-green-700 rounded-full mr-2 flex-shrink-0"></span>
                      <span className="text-green-700 font-medium">
                        Fulfilled by {pair.fulfillment.course.codes[0]}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2 flex-shrink-0"></span>
                      <span className="text-red-600">Not fulfilled yet</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Placeholder components for the new tabs
function ProgressTab() {
  return (
    <div className="p-4 text-center text-gray-500">
      Progress content will be displayed here
    </div>
  );
}

function RemindersTab() {
  return (
    <div className="p-4 text-center text-gray-500">
      Reminders content will be displayed here
    </div>
  );
}

interface MajorReqListProps {
  major_progress: MajorProgress;
}

function MajorRequirementList({ major_progress }: MajorReqListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<
    "requirements" | "progress" | "reminders"
  >("requirements");

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const tabs = [
    { id: "requirements" as const, label: "Requirements 📋" },
    { id: "progress" as const, label: "Progress 📈" },
    { id: "reminders" as const, label: "Reminders 🔔" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "requirements":
        return (
          <ul className="flex-1 overflow-y-auto p-2">
            {major_progress.requirements.map((reqProgressGroup, index) => {
              const isExpanded = expandedIndex === index;
              let remainingRequirements = 0;
              let descriptionText = "";

              if (
                reqProgressGroup.requiredNum ==
                reqProgressGroup.courseItems.length
              )
                descriptionText = "Must complete all requirements within";
              else
                descriptionText = `Must complete ${reqProgressGroup.requiredNum} requiremets`;

              remainingRequirements =
                reqProgressGroup.requiredNum - reqProgressGroup.completedNum;

              return (
                <li key={index} className="m-2">
                  <div
                    className="bg-gray-100 border-gray-200 border-2 rounded-md cursor-pointer hover:bg-gray-200 transition-colors text-center flex-row items-center justify-center p-1"
                    onClick={() => toggleExpanded(index)}
                  >
                    <div className="flex flex-row gap-4 items-start w-full">
                      <div
                        className={`w-6 h-6 border-2 rounded-sm mt-1 ml-1 shrink-0 flex justify-center items-center text-center${
                          reqProgressGroup.isCompleted
                            ? "border-green-500 bg-green-500"
                            : "bg-gray-100 border-red-600 text-red-600 font-medium"
                        }`}
                      >
                        {remainingRequirements > 0 ? remainingRequirements : ""}
                      </div>

                      <div className="flex flex-col flex-grow">
                        <span className="font-medium">
                          {reqProgressGroup.description}
                        </span>
                        <span className="text-sm text-gray-500">
                          {descriptionText}
                        </span>
                      </div>

                      <div
                        className="text-gray-500 transition-transform duration-200"
                        style={{
                          transform: isExpanded
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        ▼
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="transition-all duration-300 ease-in-out">
                      <ClassRequirementMap
                        reqProgressGroup={reqProgressGroup}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        );
      case "progress":
        return <ProgressTab />;
      case "reminders":
        return <RemindersTab />;
    }
  };

  return (
    <div className="h-96 w-102 bg-white border-gray-200 border-2 m-2 shadow flex flex-col">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setExpandedIndex(null); // Reset expanded state when switching tabs
            }}
            className={`flex-1 px-3 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default MajorRequirementList;
