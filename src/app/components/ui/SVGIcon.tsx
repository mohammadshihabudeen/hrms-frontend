import React from "react";

type Props = {
  item: {
    id: number;
    name: string;
    active: boolean;
    viewBox: string;
    svgPath: string[];
  };
  isActive: boolean;
};

const SVGIcon: React.FC<Props> = ({ item, isActive }) => {
  return (
    <svg
      stroke="currentColor"
      fill={isActive ? "url(#grad1)" : "#3a3a3a"}
      strokeWidth="0"
      viewBox={item.viewBox}
      height="18px"
      width="18px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            style={{ stopColor: "hsla(190, 68%, 50%, 1)", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "hsla(239, 34%, 47%, 1)", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      {item.svgPath.map((path, index) => (
        <path key={index} d={path}></path>
      ))}
    </svg>
  );
};

export default SVGIcon;
