import { type MajorRequirement } from "./type-program";
import {getCourse} from "../data/mock_courses";

export const general_requirements: MajorRequirement = {
    name: "General Requirements",
    totalCourses: 13,
    totalRequirementGroups: 6,
        requirements: [    
            {
                type: "category-requirement", 
                category: "Hu",
                description: "Humanity", 
                requiredNum: 2
            },  

            {
                type: "category-requirement", 
                category: "Sc",
                description: "Science", 
                requiredNum: 2
            },  

            {
                type: "category-requirement", 
                category: "So",
                description: "Social Science", 
                requiredNum: 2
            },  

            {
                type: "category-requirement", 
                category: "QR",
                description: "Quantitative Reasoning", 
                requiredNum: 2
            },  

            {
                type: "category-requirement", 
                category: "WR",
                description: "Writing", 
                requiredNum: 2
            },

            // add this in MajorProgressionRequirements
            {
            type: "progression-requirement",
            description: "Language (L1)", 
            languageCode: "CHNS",
            levelDist: ["L1", "L2", "L3"],
        }
        ]
}


export const cs_requirements_bs: MajorRequirement = {
    name: "Computer Science B.S.",
    totalCourses: 12,
    totalRequirementGroups: 3,
    requirements: [    
        {
        type: "course-requirement", 
        description: "Core Requirements",
        courses: [
            {type: "single", courses: [getCourse("CPSC 201")]},
            {type: "single", courses: [getCourse("CPSC 202")]},
            {type: "single", courses: [getCourse("CPSC 223")]},
            {type: "single", courses: [getCourse("CPSC 323")]},
            {type: "single", courses: [getCourse("CPSC 365")]}
        ]
        },  

        {
            type: "elective-requirement", 
            description: "Electives", 
            codes: ["CPSC"], 
            minLevel: 300, 
            requiredNum: 6
        },  

        {
            type: "course-requirement", 
            description: "Senior Project", 
            courses: [
                {type: "single", courses: [getCourse("CPSC 4900")]},
            ]
        },      
    ]

      }