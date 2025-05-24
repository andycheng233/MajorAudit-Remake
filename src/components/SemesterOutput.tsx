import { type StudentSemester } from "../types/type-user";
import CourseOutput from "./CourseOutput";
import BlankCourseOutput from "../components/BlankCourseOutput";
import trashcan from "../assets/trashcan.svg";
import { removeSemester } from "../utils/userDataHelpers";
import { useUser } from "../context/UserContext";

interface SemesterOutputProps {
  semester: StudentSemester;
}

function SemesterOutput({ semester }: SemesterOutputProps) {
  const { userData, setUserData } = useUser();

  const handleSemesterRemove = () => {
    if (userData) setUserData(removeSemester(userData, semester));
  };

  return (
    <>
      <div className="flex flex-col border-gray-300 border-4  p-4 m-6 rounded-xl bg-gray-50">
        <h2 className="mb-2 text-xl font-bold">{semester.title}</h2>
        <ul className="flex flex-row p-2 gap-4 flex-wrap">
          {semester.studentCourses.map((studentCourse) => (
            <li>
              <div className="w-54">
                <CourseOutput course={studentCourse.course} />
              </div>
            </li>
          ))}
          <li>
            <div className="w-54">
              <BlankCourseOutput />
            </div>
          </li>
        </ul>
        <button onClick={handleSemesterRemove}>
          <img
            src={trashcan}
            alt="trashcan"
            className="h-6 w-6 float-right active:scale-125 transition duration-300 ease-in-out"
          ></img>
        </button>
      </div>
    </>
  );
}

export default SemesterOutput;
