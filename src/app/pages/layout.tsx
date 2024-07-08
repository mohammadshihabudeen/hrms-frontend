"use client";
import SideBar from "../components/layout/SideBar"; // Adjust the path as necessary
import Header from "../components/layout/Header";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  return (
    <div className={`App ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="app-container">
        <Header />
        <div className="main-container">
          <SideBar />
          <main className="content">{children}</main>
        </div>
      </div>
    </div>
  );
}
