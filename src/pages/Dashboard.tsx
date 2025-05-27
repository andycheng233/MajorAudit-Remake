import checkIcon from "../assets/check.svg";
import { useUser } from "../context/UserContext";

import { useMemo } from "react";

import { calcTotalCredits, calcTotalCourses } from "../utils/userDataHelpers";
import { formatC_P_UP } from "../utils/formatHelpers";

function Dashboard() {
  const { userData } = useUser();

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
      <div className="min-h-screen bg-gray-50 p-6 min-w-screen">
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

        {/* Requirements Progress */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Progress by Category</h2>

          {/* Example progress bars */}
          <div className="mb-4">
            <p className="mb-1 font-medium">Core Courses</p>
            <div className="w-full bg-gray-200 rounded h-4">
              <div
                className="bg-blue-600 h-4 rounded"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-1 font-medium">Electives</p>
            <div className="w-full bg-gray-200 rounded h-4">
              <div
                className="bg-green-600 h-4 rounded"
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-1 font-medium">General Education</p>
            <div className="w-full bg-gray-200 rounded h-4">
              <div
                className="bg-yellow-500 h-4 rounded"
                style={{ width: "90%" }}
              ></div>
            </div>
          </div>
        </section>

        {/* Upcoming Courses / Alerts */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Courses</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>CS 450 - Advanced Algorithms (Fall 2025)</li>
            <li>MATH 310 - Linear Algebra (Spring 2025)</li>
            <li>PHYS 220 - Modern Physics (Fall 2025)</li>
          </ul>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
