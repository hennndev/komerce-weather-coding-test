"use client";

interface WeatherStatsProps {
  humidity: number
  windSpeed: number
  pressure: number
  minTemp: number
  maxTemp: number
}

export default function WeatherStats({ humidity, windSpeed, pressure, minTemp, maxTemp }: WeatherStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
      <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-100 h-max">
        <div className="text-black text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Kelembaban</div>
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">{humidity}%</div>
      </div>
      <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-100 h-max">
        <div className="text-black text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Kecepatan Angin</div>
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">{windSpeed} mph</div>
      </div>
      <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-100 h-max">
        <div className="text-black text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Kecepatan Angin</div>
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">{windSpeed} mph</div>
      </div>
      <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-100 h-max">
        <div className="text-black text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Tekanan</div>
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">{pressure} hPa</div>
      </div>
      <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-100 h-max">
        <div className="text-black text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Suhu Minimum</div>
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
          {((minTemp - 32) * 5 / 9).toFixed(1)}°C</div>
      </div>
      <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-100 h-max">
        <div className="text-black text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Suhu Maksimum</div>
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">{((maxTemp - 32) * 5 / 9).toFixed(1)}°C</div>
      </div>
    </div>
  );
}
