"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";


export default function CityInput() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "";
  const [search, setSearch] = useState(city || ""); 
  
  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("city", search);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
      <input
        type="text"
        id="city"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-transparent backdrop-blur-md border-2 border-gray-300 focus:ring-2 focus:ring-white/50 text-gray-500 text-base sm:text-lg font-medium transition-all"
        placeholder="Input nama kota.."
      />
      <button onClick={handleSubmit} className="w-full sm:w-auto cursor-pointer bg-blue-500 font-semibold text-white p-3 sm:p-4 rounded-2xl">Submit</button>
    </div>
  );
}
