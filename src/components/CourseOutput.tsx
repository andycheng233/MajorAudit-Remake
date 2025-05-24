import { type Course } from "../types/type-user";
import DistributionOutput from "./DistributionOutput";

interface CourseOutputProps {
  course: Course;
}

function formatSeason(seasons: string[]) {
  let output = "";
  seasons.forEach((season, index) => {
    index === 0 ? (output += season) : (output += ", " + season);
  });

  return output;
}

function formatCredits(credit: number) {
  let output = "";
  credit === 1 ? (output += "1 Credit") : (output += credit + " Credits");
  return output;
}

function formatDistributions(distributions: string[]) {
  return (
    <div className="flex flex-row gap-2">
      {distributions.map((distribution) => (
        <DistributionOutput distribution={distribution} />
      ))}
    </div>
  );
}

function CourseOutput({ course }: CourseOutputProps) {
  return (
    <>
      <div className="flex flex-col justify-between p-2 bg-gray-200 w-full h-24 rounded-md">
        <p className="font-bold truncate overflow-hidden whitespace-nowrap">
          {course.codes[0]}
          <span className="text-gray-500 text-sm font-medium">
            {" "}
            ({formatSeason(course.seasons)})
          </span>
        </p>
        <p className="truncate overflow-hidden whitespace-nowrap">
          {course.title}
        </p>
        <div className="flex flex-row items-center justify-between">
          <p>{formatCredits(course.credit)}</p>
          {formatDistributions(course.dist)}
        </div>
      </div>
    </>
  );
}

export default CourseOutput;
