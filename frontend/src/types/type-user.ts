
import { type DegreeConfiguration, type MajorRequirement, type MajorProgress, type StudentDegree} from "./type-program";

export interface Course {
  codes: string[]; 		// ["FREN 403", "HUMS 409"]
  title: string; 			// "Proust Interpretations: Reading <i>Remembrance of Things Past</i>"
  credit: number; 		// 1
  dist: string[]; 		// ["Hu"]
  seasons: string[]; 	// ["Spring"]
}

export interface StudentCourse {
  course: Course; 	
	term: number; 		// 202401
  status: string; 	// "DA_COMPLETE" | "DA_PROSPECT" | "MA_VALID" | "MA_HYPOTHETICAL"
}

export interface StudentSemester {
    season: number;
    title: string;
	studentCourses: StudentCourse[];
    isCompleted: boolean; // completed (true) vs planned (false)
}

export interface FYP {
	languageRequirement: string;
	studentSemesters: StudentSemester[];

  // shows degree, major, certificate requirements
  degreeConfigurations: MajorRequirement[];
  degreeProgress: MajorProgress[];

	//degreeConfigurations: DegreeConfiguration[][];
	//degreeDeclarations: StudentDegree[];
}



export interface User {
	name: string;
	netID: string;
	onboard: boolean;
	FYP: FYP;
}
