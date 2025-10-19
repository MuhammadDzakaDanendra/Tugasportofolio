// src/components/LogoutButton.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/action/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
    >
      Log Out
    </button>
  );
}
