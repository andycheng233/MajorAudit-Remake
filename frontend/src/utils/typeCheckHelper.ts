import { type CourseRequirement,
  type GroupRequirement, 
  type CategoryRequirement, 
  type LevelRequirement, 
  type ProgressionRequirement 
} from "../types/type-program";

export function isCourseRequirement(
  obj: any
): obj is CourseRequirement {
  return obj?.type === "course-requirement";
}

export function isGroupRequirement(
  obj: any
): obj is GroupRequirement {
  return obj?.type === "group-requirement";
}

export function isCategoryRequirement(
  obj: any
): obj is CategoryRequirement {
  return obj?.type === "category-requirement";
}

export function isLevelRequirement(
  obj: any
): obj is LevelRequirement {
  return obj?.type === "level-requirement";
}

export function isProgressionRequirement(
  obj: any
): obj is ProgressionRequirement {
  return obj?.type === "progression-requirement";
}