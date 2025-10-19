"use client";
import { useState } from "react";
import Home from "./Home";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";

const Header = () => {
  const [activeTab, setActiveTab] = useState<
    "home" | "about" | "skills" | "projects" | "contact"
  >("home");

  const tabs = [
    { id: "home", label: "Home", component: Home },
    { id: "about", label: "About", component: About },
    { id: "skills", label: "Skills", component: Skills },
    { id: "projects", label: "Projects", component: Projects },
    { id: "contact", label: "Contact", component: Contact },
  ] as const;

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="bg-white shadow-lg min-h-screen">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600 hover:border-b-2 hover:border-purple-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Active Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          key={activeTab} // Ensures animation triggers on tab change
          className="transition-opacity duration-300 ease-in-out opacity-100 animate-fadeIn"
        >
          {ActiveComponent ? <ActiveComponent /> : <div>Content not found</div>}
        </div>
      </div>
    </div>
  );
};

export default Header;
