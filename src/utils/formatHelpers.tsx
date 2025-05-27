import DistributionOutput from "../components/DistributionOutput";

export function formatSeason(seasons: string[]) {
  let output = "";
  seasons.forEach((season, index) => {
    index === 0 ? (output += season) : (output += ", " + season);
  });

  return output;
}

export function formatCredits(credit: number) {
  let output = "";
  credit === 1 ? (output += "1 Credit") : (output += credit + " Credits");
  return output;
}

export function formatDistributions(distributions: string[]) {
  return (
    <div className="flex flex-row gap-2">
      {distributions.map((distribution) => (
        <DistributionOutput key={distribution} distribution={distribution} />
      ))}
    </div>
  );
}

// format taken completed, planned, unplanned
export function formatC_P_UP(
  completed: number,
  planned: number,
  unplanned: number
) {
  return (
    <div className="flex flex-row gap-2 text-xs font-normal">
      <div className="bg-green-100 text-green-700 rounded-md p-1">
        {completed} COMPLETED
      </div>
      <div className="bg-orange-100 text-orange-400 rounded-md p-1">
        {planned} PLANNED
      </div>
      <div className="bg-gray-100 text-black rounded-md p-1">
        {unplanned} UNPLANNED
      </div>
    </div>
  );
}
