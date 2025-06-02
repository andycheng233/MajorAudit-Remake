
import { type StudentCourse } from "./type-user";

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

// for classes with substitutes
interface CourseOptions {
	options: StudentCourse[];
}

interface BaseRequirement {
	type: string;
	description: string;
}

//make a choose class --> goes through classes to fetch the correct data

// if you need to complete certain pre-req, course requirements...
export interface CourseRequirement extends BaseRequirement {
	type:"course-requirement"
	courses: (StudentCourse | CourseOptions)[];
}

// choose 2 out of these 3 courses
export interface GroupRequirement extends BaseRequirement {
	type: "group-requirement";
	requiredNum: number;
	courses: (StudentCourse | CourseOptions)[];
}

export interface CategoryRequirement extends BaseRequirement {
	type:"category-requirement";
	category:string;
	requiredNum: number;
}

export interface LevelRequirement extends BaseRequirement {
	type:"level-requirement";
	minLevel: number;
	requiredNum: number;
}

export interface ProgressionRequirement extends BaseRequirement {
	type: "progression-requirement";
	steps:{
	level: number;
	courses: StudentCourse[];
	}[]
}

export type MajorRequirement = {
	totalCourses: number;
	totalRequirementGroups: number;
	requirements: (CourseRequirement | GroupRequirement |  CategoryRequirement | LevelRequirement | ProgressionRequirement)[];
}; 

export interface RequirementProgress {
	type: string;
	description: string;
	completedCourses: (StudentCourse | null)[];
	finished: boolean;
}

export type MajorProgress = {
	requirementsProgress: RequirementProgress[];
}


