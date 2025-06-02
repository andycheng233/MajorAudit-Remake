import {type StudentSemester} from "../types/type-user";
import { mockCourses } from "./mock_courses";

export const mockSemesters: StudentSemester[] = [
    {
        season:202401, 
        title: "Sophomore Fall", 
        studentCourses: [{course: mockCourses[0], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[1], term: 202401, status: "DA_COMPLETE"},
    {course: mockCourses[2], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[3], term: 202401, status: "DA_COMPLETE"}, 
{course: mockCourses[4], term: 202401, status: "DA_COMPLETE"}]
    },
{
    season:202402, 
        title: "Sophomore Spring", 
        studentCourses: [{course: mockCourses[0], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[0], term: 202401, status: "DA_COMPLETE"},
   ]
    } , 
    {
    season:202402, 
        title: "Sophomore Spring", 
        studentCourses: [{course: mockCourses[0], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[0], term: 202401, status: "DA_COMPLETE"},
   ]
    } , 
    {
    season:202402, 
        title: "Sophomore Fall", 
        studentCourses: [{course: mockCourses[0], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[0], term: 202401, status: "DA_COMPLETE"},
   ]
    } , 
] 

