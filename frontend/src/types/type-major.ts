import { type MajorRequirement } from "./type-program";

export const general_requirements: MajorRequirement = {
    totalCourses: -1,
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
        ]

//add language
}


/*const cpscRequirements: MajorRequirement[] = [
  {
    type: "course-requirement",
    courses: ["CPSC 100", "CPSC 112"],
    description: "Intro courses must be completed first"
  },
  {
    type: "single",
    course: "CPSC 201",
    description: "Core programming course"
  },
  {
    type: "group",
    requiredCount: 2,
    options: ["CPSC 223", "CPSC 202", "CPSC 219"],
    description: "Choose 2 of 3 intermediate core courses"
  },
  {
    type: "level",
    minLevel: 300,
    requiredCount: 3,
    description: "At least 3 advanced-level courses"
  }
];*/