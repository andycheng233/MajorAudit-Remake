import { type User, type StudentSemester, type StudentCourse, type Course} from "../types/type-user";

export function addSemester(user: User, newSemester: StudentSemester): User {
    const semesterExists = user.FYP.studentSemesters.some((semester) => semester.season === newSemester.season);
        if(semesterExists)
            {
            alert("A semester at this term and year was already created!");
            return user;
            }
  

  return {
    ...user,
    FYP: {
      ...user.FYP,
      studentSemesters: [...user.FYP.studentSemesters, newSemester].sort((a,b) => a.season - b.season),
    }
  };
}

export function removeSemester(user:User, removeSemester: StudentSemester): User {
    return {
        ...user,
        FYP: {
            ...user.FYP, 
            studentSemesters: user.FYP.studentSemesters.filter(semester => !(semester.season === removeSemester.season && semester.title === removeSemester.title)),
        }
    };
}

export function addCourse(user: User, newCourse: StudentCourse, season: number): User {
    const updatedSemesters = user.FYP.studentSemesters.map((semester) => {
    if (semester.season === season) {
        const courseAlreadyExists = semester.studentCourses.some((course) => course.course.codes[0] === newCourse.course.codes[0]);
        if(!courseAlreadyExists)
        return {
        ...semester,
        studentCourses: [...semester.studentCourses, newCourse],
        
      };
      else {
        return semester;
      }
    }

    return semester;
  });

    return {
        ...user, 
        FYP: {
            ...user.FYP,
            studentSemesters: updatedSemesters,

        }
    }
}

export function removeCourse(user: User, removeCourse: Course, season: number): User {
    const updatedSemesters = user.FYP.studentSemesters.map((semester) => {
    if (semester.season === season) {
        return {
        ...semester,
        studentCourses: semester.studentCourses.filter(course => (!(course.course.codes[0] === removeCourse.codes[0] && course.course.title === removeCourse.title)))
        }
    }

    return semester;
  });

    return {
        ...user, 
        FYP: {
            ...user.FYP,
            studentSemesters: updatedSemesters,

        }
    }
}

export function calcTotalSemesterCredits(user: User, season: number): number {
    let totalCredits = 0;
    if(user)
    {
        const semester = user.FYP.studentSemesters.find(s => s.season === season);
        if(semester)
            semester.studentCourses.map(course => totalCredits += course.course.credit);
    }

    return totalCredits;
}

//calculates total completed credits or total planned credits
export function calcTotalCredits(user: User, isCompleted: boolean): number {
    let totalCredits = 0;
    user.FYP.studentSemesters.map(semester => {
        if(isCompleted) {
            if(semester.isCompleted) totalCredits += calcTotalSemesterCredits(user, semester.season);}
        else {
            if(!semester.isCompleted) totalCredits += calcTotalSemesterCredits(user, semester.season);}
        });

    return totalCredits;
}

//calculates total completed courses or total planned courses
export function calcTotalCourses(user:User, isCompleted:boolean) : number {
    let totalCourses = 0;
    user.FYP.studentSemesters.map(semester => {
        if(isCompleted) {
            if(semester.isCompleted) totalCourses += semester.studentCourses.length;}
        else {
            if(!semester.isCompleted) totalCourses += semester.studentCourses.length;}
        });

    return totalCourses;
}

export function updateIsCompleted(user: User, isCompleted: boolean, season: number): User {
    const updatedSemesters = user.FYP.studentSemesters.map((semester) => {
    if (semester.season === season) {
        return {
        ...semester,
        isCompleted: isCompleted
      }
    }

    return semester;
  });

    return {
        ...user, 
        FYP: {
            ...user.FYP,
            studentSemesters: updatedSemesters,

        }
    }
}