import type { ReactNode } from "react";
// import Navbar from "@/components/Layout/Navbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      {/* Sidebar */}

      {/* Main Content */}
      {/* Navbar */}
      {/* <Navbar /> */}

      <main>{children}</main>
    </div>
  );
}
