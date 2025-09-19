
import React from 'react';
import { ForecastDay } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastCardProps {
  dayData: ForecastDay;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ dayData }) => {
  const date = new Date(dayData.date + 'T00:00:00');
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center gap-2 text-center text-white transition-all duration-300 ease-in-out hover:bg-white/20 hover:scale-105 cursor-pointer shadow-lg">
      <p className="font-semibold text-lg">{dayName}</p>
      <WeatherIcon code={dayData.day.condition.code} isDay={true} className="w-14 h-14 text-yellow-300" />
      <p className="text-sm text-gray-300">{dayData.day.condition.text}</p>
      <div className="flex gap-3 text-lg">
        <span className="font-bold">{Math.round(dayData.day.maxtemp_c)}°</span>
        <span className="text-gray-400">{Math.round(dayData.day.mintemp_c)}°</span>
      </div>
    </div>
  );
};

export default ForecastCard;
