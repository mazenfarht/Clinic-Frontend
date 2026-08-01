"use client";
import { useState, type ReactNode } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Menu } from "lucide-react";
// import Navbar from "@/components/Layout/Navbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900 text-white lg:hidden"
      >
        <Menu size={22} />
      </button>

      <Sidebar open={open} setOpen={setOpen} />

      <main className="flex-1 bg-slate-50 min-h-screen p-6 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
