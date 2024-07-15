// components/SidebarItem.tsx
import React, { Suspense, lazy } from "react";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store"; // Ensure this is correctly defined in your store setup
import { logoutUser } from "@/app/services/authService";
import { useRouter } from "next/navigation";

type Props = {
  item: {
    id: number;
    name: string;
    active: boolean;
    viewBox: string;
    svgPath: string[];
  };
  isOpen: boolean;
  onClick: () => void;
  isActive: boolean;
};

const LazySVGIcon = lazy(() => import("./SVGIcon"));

const SidebarItem: React.FC<Props> = ({ item, isOpen, onClick, isActive }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await dispatch(logoutUser());
    router.push("/");
  };

  return (
    <Link
      href={`${item.name !== "Logout" ? "/pages/" + item.name : "#"}`}
      onClick={item.name !== "Logout" ? (isOpen ? onClick : undefined) : handleLogout}
      className="ps-5 flex items-center p-2 hover:bg-gray-200 relative mb-4"
    >
      <div className="flex items-center">
        <Suspense fallback={<FaSpinner className="animate-spin" />}>
          <LazySVGIcon item={item} isActive={isActive} />
        </Suspense>
      </div>
      <p
        className={`item-text pl-2 text-sm font-medium text-gray-600 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {item.name}
      </p>
      {isActive && (
        <div className="h-5 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-l-full absolute right-0"></div>
      )}
    </Link>
  );
};

export default SidebarItem;
