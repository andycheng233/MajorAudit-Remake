import { mockSemesters } from "./mock_semesters";
import {type User} from "../types/type-user";
import { general_requirements } from "../types/type-major"; 
import { general_requirements_progress } from "./mock_major_progress";

export const initialUserData: User = {
  name: "Andy Cheng",
  netID: "ac3499",
  onboard: true,
  FYP: {
    languageRequirement: "L1",
    studentSemesters: mockSemesters,
    degreeConfigurations: [general_requirements],
    degreeProgress: [general_requirements_progress]
  }
};
