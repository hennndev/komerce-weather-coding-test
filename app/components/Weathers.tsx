"use client";

import { useEffect, useState } from "react"
import CityInput from "./CityInput"
import WeatherStats from "./WeatherStats"
import ForecastList from "./ForecastList"
import { useSearchParams } from "next/navigation"
import ErrorMessage from "./ErrorMesssage";
import { getDailyForecast } from "../utils/weatherUtils";

interface WeatherData {
  name: string
  main: {
    temp: number
    humidity: number
    pressure: number
    temp_min: number
    temp_max: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  dt: number
}

export default function Weathers() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("Purbalingga");
  const [error, setError] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState("Purbalingga");
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const searchParams = useSearchParams();
  const cityQuery = searchParams.get("city") || "Purbalingga";

  const fetchData = async (cityName: string) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=imperial`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      localStorage.setItem("weatherData", JSON.stringify(data));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };
  const fetchDataForecast = async (cityName: string) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=imperial`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      const transformData = getDailyForecast(data);
      setForecastData(transformData as any[]);
      localStorage.setItem("forecastData", JSON.stringify(data));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchCity(city);
    }, 800);
    return () => clearTimeout(timer);
  }, [city]);

  useEffect(() => {
    fetchData(searchCity);
    fetchDataForecast(searchCity);
  }, [searchCity]);

  useEffect(() => {
    if (cityQuery) {
      setCity(cityQuery);
      setSearchCity(cityQuery);
    }
  }, [cityQuery])

  
  useEffect(() => {
    const forecaseDataInLS = JSON.parse(localStorage.getItem("forecastData") as string) || [];
    const weatherDataInLS = JSON.parse(localStorage.getItem("weatherData") as string) || null;
    if (weatherDataInLS) {
      setWeatherData(weatherDataInLS);
    }
    if (forecaseDataInLS.length > 0) {
      const transformData = getDailyForecast(forecaseDataInLS);
      setForecastData(transformData as any[]);
    }
  }, []);




  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-7xl max-sm:p-4 mx-auto bg-white min-h-screen">
      {loading && (
        <div className="text-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
            <p className="text-2xl text-white font-medium animate-pulse">Loading weather data...</p>
          </div>
        </div>
      )}



      {weatherData && !loading && (
        <div className="flex flex-col gap-6 md:gap-8 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 md:gap-8 lg:gap-12">
            <div className="space-y-4 md:space-y-6">
              <CityInput />
              {!error ? (
                <>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black drop-shadow-lg">
                    {weatherData.name}
                  </h2>
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                      alt={weatherData.weather[0].description}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 drop-shadow-2xl"
                    />
                    <div>
                      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-black capitalize drop-shadow-md">
                        {weatherData.weather[0].description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black drop-shadow-2xl">
                      {((Math.round(weatherData.main.temp) - 32) * 5 / 9).toFixed(1)}°C
                    </div>
                    <div className="text-black/80 text-base sm:text-lg md:text-xl mt-2 md:mt-4">
                      {formatDate(weatherData.dt)}
                    </div>
                  </div>
                </>
              ) : <></>}

            </div>
            {!error && forecastData.length > 0 ? (
              <WeatherStats
                humidity={weatherData.main.humidity}
                windSpeed={weatherData.wind.speed}
                pressure={weatherData.main.pressure}
                minTemp={weatherData.main.temp_min}
                maxTemp={weatherData.main.temp_max}
              />
            ) : <></>}
          </div>
          {!error && forecastData.length > 0 ? (
            <ForecastList forecasts={forecastData} />
          ) : (
            <></>
          )}
          {error && (
            <ErrorMessage message={error}/>
          )}
        </div>
      )}
    </div>
  );
}