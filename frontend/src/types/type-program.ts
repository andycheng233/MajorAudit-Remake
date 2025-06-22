
import { type Course, type StudentCourse } from "./type-user";

interface DUS {
	name: string;
	address: string;
	email: string;
}

interface DegreeMetadataStats {
	courses: number;
	rating: number;
	workload: number;
	type: string;
}

export interface DegreeMetadata {
	name: string;
	abbr: string;
	degreeType: string;
	stats: DegreeMetadataStats;
	students: number;
	about: string;
	dus: DUS;
	catologLink: string;
	wesbiteLink: string;
}

// \BEGIN{MAJOR MAGIC}

interface DegreeRequirementsSubsection {
	name?: string;
	description?: string;
	flexible: boolean;
	courses: StudentCourse[];
}

interface DegreeRequirement {
	name: string;
	description?: string;
	subsections: DegreeRequirementsSubsection[];
}

export interface DegreeConfiguration {
	degreeRequirements: DegreeRequirement[];
}

export interface Degree {
	metadata: DegreeMetadata;
	configuration: DegreeConfiguration;
}

// \END{MAJOR MAGIC}

export interface StudentDegree {
	status: string; // DA | ADD | PIN
	programIndex: number;
	degreeIndex: number;
}

// for both single courses and multi courses, example: you can either take CPSC 202 or MATH 244
interface CourseItem {
	type: 'single' | 'multi';
	courses: Course[];
}

interface BaseRequirement {
	type: string;
	description: string;
}

//make a choose class --> goes through classes to fetch the correct data

// if you need to complete certain pre-req, course requirements...
 interface CourseRequirement extends BaseRequirement {
	type:"course-requirement"
	courses: (CourseItem)[];
}

interface CourseRequirementProgress extends CourseRequirement {
	completedCourses: (StudentCourse | null)[];
	isFinished: boolean;
}

// choose 2 out of these 3 courses
interface GroupRequirement extends BaseRequirement {
	type: "group-requirement";
	requiredNum: number;
	courses: (CourseItem)[];
}

interface GroupRequirementProgress extends GroupRequirement {
	completedCourses: (StudentCourse | null)[];
	isFinished: boolean;
}

interface CategoryRequirement extends BaseRequirement {
	type:"category-requirement";
	category:string;
	requiredNum: number;
}

interface CategoryRequirementProgress extends CategoryRequirement {
	completedCourses: (StudentCourse | null)[];
	isFinished: boolean;
}

interface ElectiveRequirement extends BaseRequirement {
	type:"elective-requirement";
	codes: string[];
	minLevel: number;
	requiredNum: number;
}

interface ElectiveRequirementProgress extends ElectiveRequirement {
	completedCourses: (StudentCourse | null)[];
	isFinished: boolean;
}

interface ProgressionRequirement extends BaseRequirement {
	type: "progression-requirement";
	languageCode: string;
	levelDist: string[];
}

interface ProgressionRequirementProgress extends ProgressionRequirement {
	completedCourses: (StudentCourse | null)[];
	isFinished: boolean;
}

export type MajorRequirementType = (CourseRequirement | GroupRequirement |  CategoryRequirement | ElectiveRequirement | ProgressionRequirement);
export type MajorProgressType = (CourseRequirementProgress | GroupRequirementProgress |  CategoryRequirementProgress | ElectiveRequirementProgress | ProgressionRequirementProgress)


export type MajorRequirement = {
	name: string;
	totalCourses: number;
	totalRequirementGroups: number;
	requirements: MajorRequirementType[];
}; 

export type MajorProgress = {
	name: string;
	totalCourses: number;
	totalCompletedCourses: number;
	totalRequirementGroups: number;
	totalCompletedRequirementGroups: number;
	requirementsProgress: MajorProgressType[];
}; 


