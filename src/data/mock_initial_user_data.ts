import { mockSemesters } from "./mock_semesters";
import {type User} from "../types/type-user";

export const initialUserData: User = {
  name: "Andy Cheng",
  netID: "ac3499",
  onboard: true,
  FYP: {
    languageRequirement: "L1",
    studentSemesters: mockSemesters,
    academicRequirements: {
      "Hu": [],
      "Sc": [], 
      "So": [], 
      "QR": [], 
      "WR": [], 
      "language": []
    },
    degreeConfigurations: [],
    degreeDeclarations: [] 
  }
};
