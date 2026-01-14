"use client";

import ForecastCard from "./ForecastCard";

interface Forecast {
  day: string;
  condition: string;
  humidity: number;
  isToday?: boolean;
  temp: number;
}

interface ForecastListProps {
  forecasts: Forecast[];
}

export default function ForecastList({ forecasts }: ForecastListProps) {
  return (
    <div className="overflow-x-auto h-auto h-auto pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
        {forecasts.map((forecast, index) => (
          <ForecastCard
            key={index}
            day={forecast.day}
            condition={forecast.condition}
            humidity={forecast.humidity}
            temperature={forecast.temp}
            isToday={forecast.isToday}
          />
        ))}
      </div>
    </div>
  );
}
