// components/GradientCard.tsx
import React from "react";
import Link from "next/link";
interface GradientCardProps {
  name: string;
  count: number;
  icon: React.ReactNode;
  link: string;
}

const GradientCard: React.FC<GradientCardProps> = ({
  name,
  count,
  icon,
  link,
}) => {
  return (
    <div className="m-5 mb-7 gradient-card-gradient w-72 h-36 rounded-2xl shadow-2xl p-4 flex">
      <div className="flex-grow">
        <p className="text-white text-lg">{name}</p>
        {count !== 0 && <p className="text-white text-xl">{count}</p>}
      </div>
      <div className="flex flex-col justify-between items-end">
        {icon}
        <Link href={link} className="text-white text-sm underline">
          View
        </Link>
      </div>
    </div>
  );
};

export default GradientCard;
