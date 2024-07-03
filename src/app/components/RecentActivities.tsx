// components/RecentActivities.tsx
"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectAllActivities } from "../store/slices/activitiesSlice";

const RecentActivities: React.FC = () => {
  const activities = useSelector(selectAllActivities);

  return (
    <div className="bg-white p-5 py-4 rounded-2xl w-4/5 mx-auto shadow-2xl">
      <p className="text-gray-800 text-sm border-b-2 border-gray-200 pb-4 mb-3">
        Recent Activities
      </p>
      <ul className="list-none p-0 m-0">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-center py-2 border-b-2 border-gray-200 last:border-0"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
            <div className="flex-grow text-gray-800 text-sm">
              <span className="font-bold">{activity.user}</span>{" "}
              {activity.action}
            </div>
            <div className="text-gray-800 text-sm">{activity.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
