"use client";

interface ForecastCardProps {
  day: string;
  condition: string;
  humidity: number;
  isToday?: boolean;
  temperature: number;
}

export default function ForecastCard({ day, condition, humidity, isToday, temperature }: ForecastCardProps) {
  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes("cloud")) {
      return (
        <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
          <path
            d="M25 65C18.5 65 13 59.5 13 53C13 46.5 18.5 41 25 41C25.5 41 26 41 26.5 41.1C28.5 33.5 35.5 28 43.5 28C52.5 28 60 35.5 60 44.5C60 45 60 45.5 59.9 46C66.5 46.5 72 52.2 72 59C72 65.9 66.4 71.5 59.5 71.5H25Z"
            fill="currentColor"
            className={isToday ? "text-black" : "text-gray-600"}
          />
        </svg>
      );
    } else {
      return (
        <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="15" fill="currentColor" className={isToday ? "text-black" : "text-gray-600"} />
          <g className={isToday ? "text-black" : "text-gray-600"} fill="currentColor">
            <rect x="48" y="20" width="4" height="10" />
            <rect x="48" y="70" width="4" height="10" />
            <rect x="20" y="48" width="10" height="4" />
            <rect x="70" y="48" width="10" height="4" />
            <rect x="30" y="30" width="4" height="7" transform="rotate(-45 32 32)" />
            <rect x="66" y="30" width="4" height="7" transform="rotate(45 68 32)" />
            <rect x="30" y="66" width="4" height="7" transform="rotate(45 32 68)" />
            <rect x="66" y="66" width="4" height="7" transform="rotate(-45 68 68)" />
          </g>
        </svg>
      );
    }
  };

  return (
    <div className={`flex flex-col items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 rounded-2xl min-w-0 sm:min-w-[120px] md:min-w-[160px] transition-all hover:scale-105 border border-gray-200 shadow-md ${isToday
      ? "bg-white/30 backdrop-blur-md text-black border-2 border-white/50 shadow-xl"
      : "bg-white/10 backdrop-blur-md text-black border border-white/30"
      }`}
    >
      <div className={`text-sm sm:text-base md:text-lg font-semibold`}>
        {day}
      </div>
      {getWeatherIcon(condition)}
      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="flex flex-col items-center justify-center">
          <div className={`text-xs sm:text-sm ${isToday ? "text-black" : "text-gray-500"}`}>
            Humidity
          </div>
          <div className={`text-base sm:text-xl font-semibold ${isToday ? "text-black" : "text-gray-800"}`}>
            {humidity}%
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className={`text-xs sm:text-sm ${isToday ? "text-black" : "text-gray-500"}`}>
            Temp
          </div>
          <div className={`text-base sm:text-xl font-semibold ${isToday ? "text-black" : "text-gray-800"}`}>
            {((Math.round(temperature) - 32) * 5 / 9).toFixed(1)}°C
          </div>
        </div>
      </div>
    </div>
  );
}
