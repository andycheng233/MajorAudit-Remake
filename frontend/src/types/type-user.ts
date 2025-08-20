
import {type MajorTemplate, type MajorProgress} from "./type-program";

export interface Course {
  codes: string[]; 		// ["FREN 403", "HUMS 409"]
  title: string; 			// "Proust Interpretations: Reading <i>Remembrance of Things Past</i>"
  credit: number; 		// 1
  dist: string[]; 		// ["Hu"]
  seasons: string[]; 	// ["Spring"]
  season_codes: string[]; // ["202601", "202503"]
}

export interface StudentCourse {
  course: Course; 	
	term: number; 		// 202401
  status: string; 	// "DA_COMPLETE" | "DA_PROSPECT" | "MA_VALID" | "MA_HYPOTHETICAL"
}

// 01 - spring, 02 - summer, 03 - fall
export interface StudentSemester {
    season: number;
    title: string;
	studentCourses: StudentCourse[];
    isCompleted: boolean; // completed (true) vs planned (false)
}

interface ProgramStats 
{
  majorNum: number;
  certificateNum: number;
}

export interface FYP {
	languageRequirement: string;
	studentSemesters: StudentSemester[];

  // shows degree, major, certificate requirements
  // degreeConfigurations: MajorRequirement[];

  degreeProgress: MajorProgress[];
  statCount: ProgramStats; // how many majors added, how many certificates added

	//degreeConfigurations: DegreeConfiguration[][];
	//degreeDeclarations: StudentDegree[];
}

export interface User {
	name: string;
	netID: string;
	onboard: boolean;
	FYP: FYP;
}
