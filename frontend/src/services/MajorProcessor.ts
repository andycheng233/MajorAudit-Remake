import type { MajorTemplate,  MajorProgress, GroupItemTemplate, GroupItemProgress, CourseItemTemplateType, CourseItemProgressType} from "../types/type-program";
import type { StudentCourse } from "../types/type-user";

import { CourseDatabase } from "./CourseDatabase";

export async function loadMajorTemplates(json_file : string)
{
    try {
        console.log(`Loading major templates from ${json_file}...`);
        const response = await fetch(json_file);

        if (!response.ok)
            throw new Error(`File not found: ${json_file}`);
        
        const major_templates = await response.json();

        const major_templates_normalized = major_templates.map((major_template: any) => ({
           ...major_template,
       }));

        console.log(`Succesfully loaded ${major_templates.length} major templates`)
        return major_templates_normalized;

    } catch (error) {
        console.error('Error loading courses:', error);
        return [];
    }
}

export class MajorProcessor {
    // need to turn templates into MajorProgress
    // need to optimize reqruiement fullfillment based on completed and planned courses
    
    private course_database: CourseDatabase;

    constructor(course_database: CourseDatabase) {
        this.course_database = course_database;
    }
  
    processMajorTemplate(template: MajorTemplate): MajorProgress {
        return {
        ...template,
        totalCompletedRequirementGroups: 0,
        requirements: template.requirements.map(req => this.processRequirement(req))
        };
    }

    private processRequirement(req:GroupItemTemplate): GroupItemProgress {
        return {
            description: req.description, 
            requiredNum: req.requiredNum, 
            courseItems: req.courseItems.map(courseItem => this.processCourseItem(courseItem)), 
            isCompleted: false,
            completedNum: 0
        }
    }
    
    private processCourseItem(item: CourseItemTemplateType): CourseItemProgressType {
        const baseProgress = {
        isCompleted: false,
        completedCourses: [] as StudentCourse[]
    };

    switch (item.type) {
        case "single-choice":

        case "multi-choice":
            return {
                ...item,
                ...baseProgress
            };
            
        case "combo-choice":
            return {
                ...item,
                ...baseProgress
            };
            
        case "range-choice":
            return {
                ...item,
                ...baseProgress
            };
            
        case "level-choice":
            return {
                ...item,
                ...baseProgress
            };
            
        case "category-choice":
            return {
                ...item,
                ...baseProgress
            };
            
        case "language-choice":
            return {
                ...item,
                ...baseProgress
            };
            
        default:
            // TypeScript should catch this, but just in case
            throw new Error(`Unknown course item type: ${(item as any).type}`);
    }
    }
}