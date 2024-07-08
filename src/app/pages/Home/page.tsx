import React from "react";
import GradientCard from "../../components/ui/cards/GradientCard";
import RecentActivities from "@/app/components/layout/RecentActivities";
import { FaRegEdit, FaUsers } from "react-icons/fa";
import { LuClipboardCheck } from "react-icons/lu";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-around gap-4">
        <GradientCard
          name={"Employees"}
          count={1000}
          icon={<FaUsers className="h-12 w-12 text-white" />}
          link={"Employees"}
        />
        <GradientCard
          name={"Tasks"}
          count={0}
          icon={<LuClipboardCheck className="h-12 w-12 text-white" />}
          link={"#"}
        />
        <GradientCard
          name={"Reports"}
          count={1500}
          icon={<FaRegEdit className="h-12 w-12 text-white" />}
          link={"Reports"}
        />
      </div>
      <RecentActivities />
    </div>
  );
};

export default Home;
