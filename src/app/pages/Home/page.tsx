import React from "react";
import HomeCard from "../../components/ui/HomeCard";
import RecentActivities from "../../components/RecentActivities";
import { FaRegEdit, FaUsers } from "react-icons/fa";
import { LuClipboardCheck } from "react-icons/lu";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-around">
        <HomeCard
          name={"Employees"}
          count={1000}
          icon={<FaUsers className="h-12 w-12 text-white" />}
          link={"#"}
        />
        <HomeCard
          name={"Tasks"}
          count={50}
          icon={<LuClipboardCheck className="h-12 w-12 text-white" />}
          link={"#"}
        />
        <HomeCard
          name={"Reports"}
          count={1500}
          icon={<FaRegEdit className="h-12 w-12 text-white" />}
          link={"#"}
        />
      </div>
      <RecentActivities />
    </div>
  );
};

export default Home;
