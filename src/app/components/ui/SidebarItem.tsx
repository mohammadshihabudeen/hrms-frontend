// SidebarItem.js
import React from "react";
type props = {
  item: {
    id: number;
    name: string;
    active: boolean;
    viewBox: string;
    svgPath: string[];
  };
  isOpen: boolean;
  onClick: any;
  isActive: boolean;
};
const SidebarItem = ({ item, isOpen, onClick, isActive }: props) => {
  return (
    <a
      href={`${item.name !== "Logout" ? "/pages/" + item.name : "/"}`}
      onClick={isOpen ? onClick : undefined}
      className="ps-5 flex items-center p-2 hover:bg-gray-200 relative mb-4"
    >
      <div className="flex-shrink-0 text-blue-800">
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
          {item.svgPath.map((path: any, index: number) => (
            <path key={index} d={path}></path>
          ))}
        </svg>
      </div>
      <p
        className={`pl-2 text-sm font-medium text-gray-600 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {item.name}
      </p>
      {isActive && (
        <div className="h-5 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-l-full absolute right-0"></div>
      )}
    </a>
  );
};

export default SidebarItem;
