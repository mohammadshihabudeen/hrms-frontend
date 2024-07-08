"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../components/SideBar"; // Adjust the path as necessary
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import LoadingBg from "../components/ui/loadingBg"; // Import the loading component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const sidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const handleNavigation = async (method: () => void) => {
    setLoading(true); // Set loading state on navigation start
    await method(); // Execute the navigation method
    setLoading(false); // Set loading state on navigation complete
  };

  const handlePush = () => handleNavigation(() => router.push("/"));
  const handleReplace = () => handleNavigation(() => router.replace("/"));
  // Add similar functions for other navigation methods if needed

  return (
    <div className={`App ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="app-container">
        <Header />
        <div className="main-container">
          <SideBar />
          {loading && <LoadingBg />}

          <main className="content">{children}</main>
        </div>
      </div>
    </div>
  );
}
