import { type User, type StudentSemester, type StudentCourse} from "../types/type-user";

export function addSemester(user: User, newSemester: StudentSemester): User {
  return {
    ...user,
    FYP: {
      ...user.FYP,
      studentSemesters: [...user.FYP.studentSemesters, newSemester],
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
      return {
        ...semester,
        courses: [...semester.studentCourses, newCourse],
      };
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
