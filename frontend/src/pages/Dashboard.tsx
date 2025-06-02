import checkIcon from "../assets/check.svg";
import { useUser } from "../context/UserContext";

import { useMemo, useState } from "react";

import { calcTotalCredits, calcTotalCourses } from "../utils/userDataHelpers";
import { formatC_P_UP } from "../utils/formatHelpers";
import MajorRequirementList from "../components/MajorRequirementList";

function Dashboard() {
  const { userData } = useUser();
  const [activeTab, setActiveTab] = useState("degree");

  const graduationCreditsRequired = 36;

  const totalCompletedCredits = useMemo(
    () => (userData ? calcTotalCredits(userData, true) : 0),
    [userData]
  );

  const totalPlannedCredits = useMemo(
    () => (userData ? calcTotalCredits(userData, false) : 0),
    [userData]
  );

  const totalCompletedCourses = useMemo(
    () => (userData ? calcTotalCourses(userData, true) : 0),
    [userData]
  );

  return (
    <>
      <div className=" h-full flex flex-col bg-gray-50 p-6 min-w-screen">
        {/* Header */}
        <header className="mb-8 flex gap-3 items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {userData?.name.split(" ")[0]}'s Dashboard {/* get first name*/}
          </h1>
          <img src={checkIcon} alt="check icon" className="w-9 h-9"></img>
        </header>

        {/* Requirements Progress */}
        <section className="flex flex-row w-full gap-4">
          <div className="bg-white rounded-lg shadow p-6 mb-8 w-1/2">
            <h3 className="text-md font-semibold mb-2">
              Degree Progress (Credits)
            </h3>

            <div className="mb-4 h-3 w-full flex overflow-hidde">
              <div
                style={{
                  width: `${
                    (totalCompletedCredits / graduationCreditsRequired) * 100
                  }%`,
                }}
                className="rounded-lg bg-green-700 transition-all duration-500 ease-out"
              ></div>
              <div
                style={{
                  width: `${
                    (totalPlannedCredits / graduationCreditsRequired) * 100
                  }%`,
                }}
                className="rounded-lg bg-yellow-500 transition-all duration-500 ease-out"
              ></div>
              <div
                style={{
                  width: `${
                    ((graduationCreditsRequired -
                      totalCompletedCredits -
                      totalPlannedCredits) /
                      graduationCreditsRequired) *
                    100
                  }%`,
                }}
                className="rounded-lg bg-gray-300 transition-all duration-500 ease-out"
              ></div>
            </div>
            {formatC_P_UP(
              totalCompletedCredits,
              totalPlannedCredits,
              graduationCreditsRequired -
                totalCompletedCredits -
                totalPlannedCredits
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8 w-1/2">
            <h3 className="text-md font-semibold mb-2">
              Major Progress (Courses)
            </h3>

            <div className="mb-4 h-3 w-full flex overflow-hidde">
              <div
                style={{
                  width: `${
                    (totalCompletedCredits / graduationCreditsRequired) * 100
                  }%`,
                }}
                className="rounded-lg bg-green-700 transition-all duration-500 ease-out"
              ></div>
              <div
                style={{
                  width: `${
                    (totalPlannedCredits / graduationCreditsRequired) * 100
                  }%`,
                }}
                className="rounded-lg bg-yellow-500 transition-all duration-500 ease-out"
              ></div>
              <div
                style={{
                  width: `${
                    ((graduationCreditsRequired -
                      totalCompletedCredits -
                      totalPlannedCredits) /
                      graduationCreditsRequired) *
                    100
                  }%`,
                }}
                className="rounded-lg bg-gray-300 transition-all duration-500 ease-out"
              ></div>
            </div>
            {formatC_P_UP(
              totalCompletedCredits,
              totalPlannedCredits,
              graduationCreditsRequired -
                totalCompletedCredits -
                totalPlannedCredits
            )}
          </div>
        </section>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-gray-500">Courses Completed</h2>
            <p className="text-3xl font-semibold">{totalCompletedCourses}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-gray-500">Credits Remaining</h2>
            <p className="text-3xl font-semibold">30</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-gray-500">
              Distributional Requirements Completed
            </h2>
            <p className="text-3xl font-semibold">5 / 7</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-gray-500">Current GPA</h2>
            <p className="text-3xl font-semibold">3.8</p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow p-4 mb-4 w-full  flex flex-col flex-grow ">
          <div className="flex gap-4 border-b mb-4">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "degree"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("degree")}
            >
              Degree
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "major"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("major")}
            >
              Major
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "certificates"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("certificates")}
            >
              Certificates
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "pinned"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("pinned")}
            >
              Pinned
            </button>
          </div>
          <div className="flex flex-row h-full mb-6">
            {userData?.FYP?.degreeProgress?.[0] ? (
              <MajorRequirementList
                major_requirement={userData.FYP.degreeConfigurations[0]}
                major_progress={userData.FYP.degreeProgress[0]}
              />
            ) : (
              <div>Loading degree requirements...</div>
            )}{" "}
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
