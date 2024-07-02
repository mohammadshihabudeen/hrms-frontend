import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home page",
  description: "Created by shihab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
