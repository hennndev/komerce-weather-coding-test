"use client";

interface CurrentWeatherProps {
  temperature: number;
  condition: string;
  date: string;
}

export default function CurrentWeather({ temperature, condition, date }: CurrentWeatherProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "cloudy":
        return (
          <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none">
            <path
              d="M25 65C18.5 65 13 59.5 13 53C13 46.5 18.5 41 25 41C25.5 41 26 41 26.5 41.1C28.5 33.5 35.5 28 43.5 28C52.5 28 60 35.5 60 44.5C60 45 60 45.5 59.9 46C66.5 46.5 72 52.2 72 59C72 65.9 66.4 71.5 59.5 71.5H25Z"
              fill="currentColor"
              className="text-gray-700"
            />
            <path
              d="M42 55C38 55 35 52 35 48C35 44 38 41 42 41C42.3 41 42.6 41 42.9 41.1C43.9 36.5 48 33 52.5 33C57.5 33 61.5 37 61.5 42C61.5 42.3 61.5 42.6 61.4 42.9C65.5 43.2 69 46.8 69 51C69 55.4 65.4 59 61 59H42Z"
              fill="currentColor"
              className="text-gray-800"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="20" fill="currentColor" className="text-yellow-400" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-gray-500 text-lg">{date}</div>
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center">
          {getWeatherIcon(condition)}
          <div className="text-3xl font-semibold text-gray-800 mt-2">{condition}</div>
        </div>
        <div className="text-8xl font-bold text-gray-800">
          {temperature}°F
        </div>
      </div>
    </div>
  );
}
