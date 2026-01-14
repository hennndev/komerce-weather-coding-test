/**
 * Utility functions for weather data processing
 * Extracted from Weathers component for easier testing
 */

export const getDailyForecast = (forecastData: any) => {
  const dailyMap = new Map();

  forecastData.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString(); // "Mon Nov 24 2024"
    const hour = date.getHours();

    // Ambil data yang paling dekat jam 12 siang
    if (!dailyMap.has(dateKey) || Math.abs(hour - 12) < Math.abs(dailyMap.get(dateKey).hour - 12)) {
      dailyMap.set(dateKey, {
        date: dateKey,
        day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        temp: Math.round(item.main.temp),
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        condition: item.weather[0].main,
        description: item.weather[0].description,
        humidity: item.main.humidity,
        icon: item.weather[0].icon,
        hour: hour
      });
    }
  });

  return Array.from(dailyMap.values()).slice(0, 5);
};

export const formatDate = (timestamp: number) => {
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
