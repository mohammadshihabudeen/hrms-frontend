"use client";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleSidebar } from "../store/slices/sidebarSlice";
import { usePathname } from "next/navigation";
import SidebarItem from "./ui/SidebarItem";
const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const pathname = usePathname();
  const elements = useSelector((state: RootState) => state.sidebar.elements);

  return (
    <div
      className={`fixed top-0 left-0 h-full transition-width duration-300 bg-white shadow-lg pt-10 ${
        isOpen ? "w-40" : "w-16"
      }`}
    >
      <div className="flex items-center justify-center p-2 z-50 mb-2">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="bg-white border-0 text-gray-600 cursor-pointer"
        >
          {isOpen ? (
            <IoMdClose className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>
      {elements.map((item) => (
        <SidebarItem
          key={item.id}
          item={item}
          isOpen={isOpen}
          onClick={() => dispatch(toggleSidebar())}
          isActive={pathname.includes(`/${item.name}`)}
        />
      ))}
    </div>
  );
};

export default SideBar;
