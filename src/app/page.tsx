import React from "react";
import Login from "./components/Login";
import AuthProvider from "./context/AuthProvider";
import Link from "next/link";
export default function Home() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
