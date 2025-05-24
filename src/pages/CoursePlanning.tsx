import { mockCourses } from "../data/mock_courses";
import { type StudentSemester } from "../types/type-user";
import { addSemester } from "../utils/userDataHelpers";

import CourseOutput from "../components/CourseOutput";
import SemesterOutput from "../components/SemesterOutput";
import { useUser } from "../context/UserContext";
import React, { useState } from "react";

import pencilIcon from "../assets/pencil.svg";
import addSemesterIcon from "../assets/addSemester.svg";

function CoursePlanning() {
  const { userData, setUserData } = useUser();
  const [semesterData, setSemesterData] = useState<StudentSemester>({
    season: -1,
    title: "",
    studentCourses: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSemesterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputSubmit = () => {
    if (!(semesterData.season != -1 && semesterData.title && userData)) {
      alert("Please fill out all fields before creating a new semester!");
      return;
    }

    setUserData(addSemester(userData, semesterData));
  };

  return (
    <>
      <div className="flex h-full">
        <div
          className="fixed w-72 flex flex-col bg-white border-gray-200 border-r-4 z-10"
          style={{ height: "calc(100vh - var(--navbar-height, 64px))" }}
        >
          <input
            type="text"
            placeholder="Search by course code, title, prof..."
            className="px-4 py-2 border-b-4 border-gray-200 bg-blue-100 placeholder-shown:bg-white w-full focus:outline-none focus:bg-gray-100
             transition-colors duration-200 ease-in-out border-t-2"
          />
          <div className="overflow-y-auto flex-1 pb-2">
            <ul className="flex flex-col p-2 w-full gap-4">
              {mockCourses.map((course, index) => (
                <li key={index}>
                  <CourseOutput course={course} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ml-72 flex-1 overflow-y-auto">
          <header className="m-6 mt-4 flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-3xl font-bold text-gray-800">
                Course Planner
              </h1>
              <img src={pencilIcon} alt="pencil icon" className="h-10 w-10" />
            </div>
            <p className="text-gray-500 font-medium mt-2">
              Welcome to your Course Planning page! Create new semesters below,
              drag classes from the sidebar to add courses, and create custom
              courses by clicking on the +!
            </p>
          </header>
          <hr className="border-gray-200 border-t-3" />
          <div className="flex flex-row p-4 pl-6 gap-4 items-center bg-gray-100">
            <button>
              <img
                src={addSemesterIcon}
                alt="addSemester icon"
                className="h-6 w-6 active:scale-125 transition duration-300 ease-in-out"
                onClick={handleInputSubmit}
              />
            </button>
            <h2 className="text-xl font-medium">Add Semester </h2>
            <select
              className="px-4 py-2 border rounded-md text-center"
              name="season"
              onChange={handleInputChange}
            >
              <option value="">Select a term</option>
              <option value="fall">Fall</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
            </select>
            <select
              className="px-4 py-2 border rounded-md text-center"
              name="year"
              onChange={handleInputChange}
            >
              <option value="">Select a year</option>
              <option value="2020">2020-2021</option>
              <option value="2021">2021-2022</option>
              <option value="2022">2022-2023</option>
              <option value="2023">2023-2024</option>
              <option value="2024">2024-2025</option>
              <option value="2025">2025-2026</option>
              <option value="2026">2026-2027</option>
              <option value="2027">2027-2028</option>
              <option value="2028">2028-2029</option>
              <option value="2029">2029-2030</option>
            </select>
            <input
              type="text"
              placeholder="Enter a label (e.g. Junior Spring)"
              className="border p-2 rounded w-64 h-10"
              name="title"
              onChange={handleInputChange}
            />
          </div>
          <hr className="border-gray-200 border-t-3" />
          {userData?.FYP.studentSemesters.map((semester, index) => (
            <SemesterOutput key={index} semester={semester} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CoursePlanning;
