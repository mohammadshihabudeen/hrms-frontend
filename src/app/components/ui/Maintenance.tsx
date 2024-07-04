// components/Maintenance.tsx
import React from "react";

interface MaintenanceProps {
  name: string;
}

const Maintenance: React.FC<MaintenanceProps> = ({ name }) => {
  return (
    <div className="mt-24 bg-center bg-no-repeat h-96 bg-[url('/assets/website-maintenance.gif')]">
      <h1 className="text-gray-600 text-center ">{name} coming soon...!</h1>
    </div>
  );
};

export default Maintenance;
