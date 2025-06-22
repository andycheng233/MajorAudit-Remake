import {type Course} from "../types/type-user";

export const mockCourses: Course[] = [
  // Existing courses
  {
    codes: ["CPSC 201"],
    title: "Introduction to Computer Science",
    credit: 1,
    dist: ["QR", "Sc"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["PSYC 110"],
    title: "Introduction to Psychology",
    credit: 1,
    dist: ["So"],
    seasons: ["Fall"]
  },
  {
    codes: ["ENGL 120"],
    title: "Reading and Writing the Modern Essay",
    credit: 1,
    dist: ["Hu", "WR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["FREN 403", "HUMS 409"],
    title: "Proust Interpretations: Reading *Remembrance of Things Past*",
    credit: 1,
    dist: ["Hu", "L5"],
    seasons: ["Spring"]
  },
  {
    codes: ["ECON 115"],
    title: "Introductory Microeconomics",
    credit: 1,
    dist: ["So", "QR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["MCDB 200"],
    title: "Molecular Biology",
    credit: 1,
    dist: ["Sc"],
    seasons: ["Spring"]
  },
  {
    codes: ["HIST 136"],
    title: "The Rise and Fall of the British Empire",
    credit: 1,
    dist: ["Hu"],
    seasons: ["Fall"]
  },
  {
    codes: ["PHYS 180"],
    title: "University Physics I",
    credit: 1,
    dist: ["Sc", "QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["AFAM 162"],
    title: "Race and Place in British Literature",
    credit: 1,
    dist: ["Hu", "WR"],
    seasons: ["Spring"]
  },
  {
    codes: ["ASTR 130"],
    title: "Origins and the Search for Life in the Universe",
    credit: 1,
    dist: ["Sc", "QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["ART 111"],
    title: "Basic Drawing",
    credit: 1,
    dist: ["Hu"],
    seasons: ["Spring"]
  },
  {
    codes: ["CSBR 200"],
    title: "Cross-Cultural Perspectives on Belief and Reason",
    credit: 1,
    dist: ["Hu", "So"],
    seasons: ["Fall"]
  },
  {
    codes: ["PHIL 125"],
    title: "Justice in the 21st Century",
    credit: 1,
    dist: ["Hu", "WR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["EVST 120", "GEO 120"],
    title: "Introduction to Environmental Studies",
    credit: 1,
    dist: ["So", "Sc"],
    seasons: ["Spring"]
  },
  {
    codes: ["LING 110"],
    title: "Introduction to Linguistics",
    credit: 1,
    dist: ["So", "QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["HIST 219"],
    title: "The U.S. Civil War and Reconstruction",
    credit: 1,
    dist: ["Hu"],
    seasons: ["Spring"]
  },
  {
    codes: ["THST 120"],
    title: "Acting Shakespeare",
    credit: 1,
    dist: ["Hu"],
    seasons: ["Spring"]
  },
  {
    codes: ["MATH 255"],
    title: "Geometry and Topology",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },

  // Core CS Requirements
  {
    codes: ["CPSC 202"],
    title: "Mathematical Tools for Computer Science",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["CPSC 223"],
    title: "Data Structures and Programming Techniques",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["CPSC 323"],
    title: "Introduction to Systems Programming and Computer Organization",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["CPSC 365"],
    title: "Design and Analysis of Algorithms",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },

  // Required Math Courses
  {
    codes: ["MATH 120"],
    title: "Calculus of Functions of One Variable I",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["MATH 225"],
    title: "Linear Algebra and Matrix Theory",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },

  // Statistics Requirement (one of these)
  {
    codes: ["STAT 242"],
    title: "Applied Statistics",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["STAT 241"],
    title: "Probability Theory",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["ENAS 496"],
    title: "Introduction to Probability and Statistics",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },

  // Popular CS Electives
  {
    codes: ["CPSC 327"],
    title: "Object-Oriented Programming",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 424"],
    title: "Computer Science Education",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["CPSC 427"],
    title: "Object-Oriented Programming",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["CPSC 434"],
    title: "Topics in Computer Science",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["CPSC 439"],
    title: "Software Engineering",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 440"],
    title: "Database Design and Implementation",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["CPSC 458"],
    title: "Automated Decision Systems",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 464"],
    title: "Human-Computer Interaction",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["CPSC 465"],
    title: "Theory of Distributed Systems",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 469"],
    title: "Topics in Artificial Intelligence",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 470"],
    title: "Artificial Intelligence",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 471"],
    title: "Computational Intelligence for Games",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["CPSC 472"],
    title: "Intelligent Robotics Laboratory",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 473"],
    title: "Intelligent Robotics Laboratory",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["CPSC 474"],
    title: "Computational Intelligence for Games",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 475"],
    title: "Computational Vision and Biological Perception",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["CPSC 477"],
    title: "Natural Language Processing",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 478"],
    title: "Machine Learning",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["CPSC 481"],
    title: "Introduction to Computer Graphics",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 484"],
    title: "Human-Computer Interaction",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 490"],
    title: "Independent Project",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["CPSC 491"],
    title: "Independent Project",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },

  // Systems and Security
  {
    codes: ["CPSC 421"],
    title: "Introduction to Machine Learning",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 426"],
    title: "Building Distributed Systems",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["CPSC 429"],
    title: "Introduction to Computer Security",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["CPSC 433"],
    title: "Computer Security",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["CPSC 438"],
    title: "Computer Networks",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },

  // Theory Courses
  {
    codes: ["CPSC 467"],
    title: "Cryptography and Computer Security",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["CPSC 468"],
    title: "Computational Complexity",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  },

  // Additional Math for CS Students
  {
    codes: ["MATH 244"],
    title: "Discrete Mathematics",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },
  {
    codes: ["MATH 250"],
    title: "Multivariate Calculus",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall", "Spring"]
  },

  // Physics for CS Students
  {
    codes: ["PHYS 181"],
    title: "University Physics II",
    credit: 1,
    dist: ["Sc", "QR"],
    seasons: ["Spring"]
  },

  // Additional Electives across disciplines
  {
    codes: ["ECON 136"],
    title: "Behavioral Economics",
    credit: 1,
    dist: ["So", "QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["PHIL 181"],
    title: "Logic",
    credit: 1,
    dist: ["Hu", "QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["LING 227"],
    title: "Computational Linguistics I",
    credit: 1,
    dist: ["So", "QR"],
    seasons: ["Fall"]
  },
  {
    codes: ["AMTH 230"],
    title: "Optimization and Game Theory",
    credit: 1,
    dist: ["QR"],
    seasons: ["Spring"]
  },
  {
    codes: ["ENAS 194"],
    title: "Introduction to Information Technologies",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  }, 
  {
    codes: ["CPSC 4900"],
    title: "CS Senior Project",
    credit: 1,
    dist: ["QR"],
    seasons: ["Fall"]
  }
];

export const getCourse = (code: string) => {
    const course =  mockCourses.find(course => course.codes.includes(code));
    if (!course) {
        throw new Error(`Course ${code} not found in mockCourses`);
    }
    return course;
  }