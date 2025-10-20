"use client";

import { LogOut, Panda } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserMenu() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // redirect to login
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Panda className="h-8 w-8 text-black" />
        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
