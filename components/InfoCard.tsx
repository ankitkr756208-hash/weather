
import React from 'react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  unit?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, unit }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex flex-col items-start gap-2 transition-all duration-300 ease-in-out hover:bg-white/20 hover:scale-105 cursor-pointer shadow-lg">
      <div className="flex items-center gap-2 text-gray-300">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <p className="text-2xl font-bold text-white">
        {value} <span className="text-lg font-normal text-gray-200">{unit}</span>
      </p>
    </div>
  );
};

export default InfoCard;
