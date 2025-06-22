import {type StudentSemester} from "../types/type-user";
import { mockCourses } from "./mock_courses";

export const mockSemesters: StudentSemester[] = [
    {
        season:202201, 
        title: "Freshman Fall", 
        studentCourses: [{course: mockCourses[0], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[1], term: 202401, status: "DA_COMPLETE"},
                         {course: mockCourses[2], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[3], term: 202401, status: "DA_COMPLETE"}], 
        isCompleted: true
    },

    {
    season:202202, 
        title: "Freshman Spring", 
        studentCourses: [{course: mockCourses[4], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[5], term: 202401, status: "DA_COMPLETE"},
                         {course: mockCourses[6], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[7], term: 202401, status: "DA_COMPLETE"}], 
   isCompleted: true
    }, 

    {
    season:202301, 
        title: "Sophomore Fall", 
        studentCourses: [{course: mockCourses[8], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[9], term: 202401, status: "DA_COMPLETE"},
                         {course: mockCourses[10], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[11], term: 202401, status: "DA_COMPLETE"}], 
        isCompleted: true
    },

    {
    season:202302, 
        title: "Sophomore Spring", 
        studentCourses: [{course: mockCourses[12], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[13], term: 202401, status: "DA_COMPLETE"},
                         {course: mockCourses[14], term: 202401, status: "DA_COMPLETE"}, {course: mockCourses[15], term: 202401, status: "DA_COMPLETE"}], 
   isCompleted: false
    },
    
    {
    season:202401, 
        title: "Junior Fall", 
        studentCourses: [], 
        isCompleted: false
    }, 

    {
    season:202402, 
        title: "Junior Spring", 
        studentCourses: [], 
        isCompleted: false
    } , 

    {
    season:202501, 
        title: "Senior Fall", 
        studentCourses: [], 
        isCompleted: false
    }, 

    {
    season:202502, 
        title: "Senior Spring", 
        studentCourses: [], 
        isCompleted: false
    } , 
] 

