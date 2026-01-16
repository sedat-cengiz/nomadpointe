import { Sun, CloudRain, Calendar } from "lucide-react";
import { City } from "@/types/city";

interface SeasonalityTrackerProps {
  city: City;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const FULL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function SeasonalityTracker({ city }: SeasonalityTrackerProps) {
  const getMonthStatus = (month: string): "best" | "good" | "avoid" => {
    if (city.bestMonths.includes(month)) return "best";
    // Adjacent months to best months are "good"
    const bestIndices = city.bestMonths.map((m) => FULL_MONTHS.indexOf(m));
    const currentIndex = FULL_MONTHS.indexOf(month);
    const isAdjacent = bestIndices.some(
      (idx) => Math.abs(idx - currentIndex) === 1 || Math.abs(idx - currentIndex) === 11
    );
    if (isAdjacent) return "good";
    return "avoid";
  };

  const getStatusColor = (status: "best" | "good" | "avoid") => {
    switch (status) {
      case "best":
        return "bg-green-500";
      case "good":
        return "bg-yellow-400";
      case "avoid":
        return "bg-gray-200";
    }
  };

  const getStatusBorder = (status: "best" | "good" | "avoid") => {
    switch (status) {
      case "best":
        return "border-green-500";
      case "good":
        return "border-yellow-400";
      case "avoid":
        return "border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
          <Calendar className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Best Time to Visit</h3>
          <p className="text-sm text-gray-500">Plan your trip wisely</p>
        </div>
      </div>

      {/* Month Timeline */}
      <div className="mb-6">
        <div className="grid grid-cols-12 gap-1">
          {MONTHS.map((month, index) => {
            const status = getMonthStatus(FULL_MONTHS[index]);
            return (
              <div key={month} className="text-center">
                <div
                  className={`h-8 rounded ${getStatusColor(status)} mb-1 flex items-center justify-center`}
                  title={`${FULL_MONTHS[index]}: ${status === "best" ? "Best time" : status === "good" ? "Good time" : "Not ideal"}`}
                >
                  {status === "best" && (
                    <Sun className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-[10px] text-gray-500">{month}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span className="text-xs text-gray-600">Best</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded" />
            <span className="text-xs text-gray-600">Good</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded" />
            <span className="text-xs text-gray-600">Not Ideal</span>
          </div>
        </div>
      </div>

      {/* Best Months Badge */}
      <div className="bg-green-50 rounded-xl p-4 mb-4">
        <div className="text-sm font-medium text-green-800 mb-2">
          Recommended Months
        </div>
        <div className="flex flex-wrap gap-2">
          {city.bestMonths.map((month) => (
            <span
              key={month}
              className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
            >
              <Sun className="w-3 h-3" />
              {month}
            </span>
          ))}
        </div>
      </div>

      {/* Climate Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-xl border-2 ${getStatusBorder("best")} bg-orange-50`}>
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-semibold text-gray-900">Summer</span>
          </div>
          <p className="text-sm text-gray-600">{city.climate.summer}</p>
        </div>
        <div className={`p-4 rounded-xl border-2 border-blue-200 bg-blue-50`}>
          <div className="flex items-center gap-2 mb-2">
            <CloudRain className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">Winter</span>
          </div>
          <p className="text-sm text-gray-600">{city.climate.winter}</p>
        </div>
      </div>
    </div>
  );
}

