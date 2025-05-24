import { mockSemesters } from "./mock_semesters";
import {type User} from "../types/type-user";

export const initialUserData: User = {
  name: "Alex Johnson",
  netID: "aj123",
  onboard: true,
  FYP: {
    languageRequirement: "L2",
    studentSemesters: mockSemesters,
    degreeConfigurations: [],
    degreeDeclarations: [] 
  }
};
