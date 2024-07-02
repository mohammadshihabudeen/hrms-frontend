// components/HomeCard.tsx
import React from "react";

interface HomeCardProps {
  name: string;
  count: number;
  icon: React.ReactNode;
  link: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ name, count, icon, link }) => {
  return (
    <div className="m-6 home-card-gradient w-64 h-32 rounded-xl shadow-lg p-4 flex">
      <div className="flex-grow">
        <p className="text-white">{name}</p>
        <p className="text-white text-xl">{count}</p>
      </div>
      <div className="flex flex-col justify-between items-end">
        {icon}
        <a href={link} className="text-white">
          View
        </a>
      </div>
    </div>
  );
};

export default HomeCard;
