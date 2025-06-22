import {type MajorProgress } from "../types/type-program";
import { mockCourses } from "./mock_courses";
import {getCourse} from "../data/mock_courses"; 
import {general_requirements, cs_requirements_bs} from "../types/type-major";


const studentCourse = {
      course: mockCourses[1],
        term: 202401,
      status: "DA_COMPLETE"
}

export const general_requirements_progress: MajorProgress = {
    ...general_requirements,
    totalCompletedCourses: 5, 
    totalCompletedRequirementGroups: 0,
    requirementsProgress: [    
        {
           ...general_requirements.requirements[0],
            completedCourses:[studentCourse, null],
            isFinished: false
        },  

        {
           ...general_requirements.requirements[1],
            completedCourses:[studentCourse, null],
            isFinished: false

        },  

        {
            ...general_requirements.requirements[2],
            completedCourses:[studentCourse, null],
            isFinished: false
        },  

        {
           ...general_requirements.requirements[3],
            completedCourses:[studentCourse, null],
            isFinished: false
        },  

        {
           ...general_requirements.requirements[4],
            completedCourses:[studentCourse, null],
            isFinished: false
        },

        {
          ...general_requirements.requirements[5],
            completedCourses: [studentCourse, null, null], 
            isFinished: false
        }
    ]
       
}

export const cs_requirements_bs_progress: MajorProgress = {
    ...cs_requirements_bs,
    totalCompletedCourses: 0, 
    totalCompletedRequirementGroups: 0,
    requirementsProgress: [
        {
            ...cs_requirements_bs.requirements[0],
            completedCourses: [null, null, null, null, null],
            isFinished: false
        },
        {
          ...cs_requirements_bs.requirements[1],
            completedCourses: [null, null, null, null, null],
            isFinished: false
        },  
         {
           ...cs_requirements_bs.requirements[2],
            completedCourses: [null],
            isFinished: false
        }  
    ]
}
