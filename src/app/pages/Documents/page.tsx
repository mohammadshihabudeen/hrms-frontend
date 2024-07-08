import React from "react";
import { IoSchool } from "react-icons/io5";
import { FaBusinessTime } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import GradientCard from "@/app/components/ui/cards/GradientCard";
const Documents = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-around gap-4">
        <GradientCard
          name={"Education Details"}
          icon={<IoSchool className="h-12 w-12 text-white" />}
          link={"Documents/Education"}
          count={0}
        />
        <GradientCard
          count={0}
          name={"Experience Details"}
          icon={<FaBusinessTime className="h-12 w-12 text-white" />}
          link={"Documents/Experience"}
        />
        <GradientCard
          count={0}
          name={"Certification Details  "}
          icon={<PiCertificateFill className="h-12 w-12 text-white" />}
          link={"Documents/Certificates"}
        />
      </div>
    </div>
  );
};

export default Documents;
