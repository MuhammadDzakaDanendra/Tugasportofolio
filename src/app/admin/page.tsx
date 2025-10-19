import React from "react";
import { getAuthCookie } from "@/lib/cookies";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";
import LogoutButton from "./Logout";
import Header from "../admin/Header";
import Home from "./Home";

async function AdminPage() {
  const token = await getAuthCookie();
  if (!token) {
    redirect("/");
  }
  const user: any = await verifyToken(token);
  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <LogoutButton />
        </div>
      </div>

      {/* Header Navigation */}
      <Header />
    </div>
  );
}

export default AdminPage;