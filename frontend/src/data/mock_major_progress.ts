import {type MajorProgress } from "../types/type-program";
import { general_requirements } from "../types/type-major";
import { mockCourses } from "./mock_courses";

export const general_requirements_progress: MajorProgress = {
    requirementsProgress: general_requirements.requirements.map(reqGroup => ({
        type: reqGroup.type,
        description: reqGroup.description,
        completedCourses: [{
            course: mockCourses[1],
            term: 202401, 
            status: "DA_COMPLETE"
        }, null],
        finished: false
    }))
       
}