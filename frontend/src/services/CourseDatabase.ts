import {type Course} from "../types/type-user";

export async function loadCourses(json_file : string)
{
    try {
        console.log(`Loading courses from ${json_file}...`);
        const response = await fetch(json_file);

        if (!response.ok)
            throw new Error(`File not found: ${json_file}`);
        
        const courses = await response.json();

        const normalizedCourses = courses.map((course: any) => ({
           ...course,
           dist: course.dist || [] // Set to empty array if missing
       }));

        console.log(`Succesfully loaded ${courses.length} courses`)
        return normalizedCourses;

    } catch (error) {
        console.error('Error loading courses:', error);
        return [];
    }
}

export class CourseDatabase {
    private courses = new Map<string, Course>();

    // maybe change to make same codes --> same courses
    constructor(coursesArray: Course[])
    {
        /*coursesArray.forEach(course => {
            course.codes.forEach(code => {
                this.courses.set(code, course);
            })
        })*/

        coursesArray.forEach(course => {
            this.courses.set(course.codes[0], course);
        })
    }

    getCourse(code : string): Course | undefined {
        return this.courses.get(code);
    }

    getCourses(codes : string[]): Course[] {
        return codes.map(code => this.getCourse(code)).filter(Boolean) as Course[];
    }

    findBySubject(subject: string, minLevel?: number): Course[] {
		return Array.from(this.courses.values()).filter(course => {
			const matchesSubject = course.codes.some(code => code.startsWith(subject));
			if (!matchesSubject) return false;
			
			if (minLevel) {
				const courseNumber = course.codes[0].split(' ')[1];
				const level = parseInt(courseNumber);
				return level >= minLevel;
			}
			return true;
		});
	}
	
	findByCategory(category: string): Course[] {
		return Array.from(this.courses.values()).filter(course => 
			course.dist?.includes(category)
		);
	}
}