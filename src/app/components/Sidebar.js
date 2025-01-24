"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { FaHome, FaTasks, FaCalendar, FaChartBar, FaCog } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [userName, setUserName] = useState("Loading...");

  // Logout function
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  // Fetch user details using useEffect
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUserName(res.data.data.username || "Unknown User"); // Update with the desired user data field
      } catch (error) {
        console.error(error.message);
        setUserName("Error fetching user");
      }
    };

    fetchUserDetails();
  }, []);

  const sidebarSections = [
    { title: "Dashboard", icon: FaHome, color: "bg-blue-500" },
    { title: "Tasks", icon: FaTasks, color: "bg-green-500" },
    { title: "Calendar", icon: FaCalendar, color: "bg-yellow-500" },
    { title: "Reports", icon: FaChartBar, color: "bg-purple-500" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-screen ${
        isCollapsed ? "w-16" : "w-72"
      } bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white transition-all duration-300 ease-in-out shadow-lg relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-4 top-9 bg-gray-700 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 shadow-lg"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <MdKeyboardArrowRight size={20} />
        ) : (
          <MdKeyboardArrowLeft size={20} />
        )}
      </button>

      {/* Sidebar Header */}
      <div className="p-5">
        <h1
          className={`text-2xl font-extrabold tracking-wide ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          PM Tool
        </h1>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-3">
          {sidebarSections.map((section) => (
            <li key={section.title}>
              <button
                onClick={() => setActiveSection(section.title)}
                className={`w-full flex items-center p-3 space-x-3 rounded-md transition-all duration-200 ease-in-out ${
                  activeSection === section.title
                    ? `${section.color} text-white shadow-lg`
                    : "bg-gray-700 hover:bg-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500`}
                aria-label={section.title}
              >
                <section.icon
                  size={24}
                  className={`${
                    activeSection === section.title ? "text-white" : "text-gray-400"
                  } ${isCollapsed ? "mx-auto" : ""}`}
                />
                {!isCollapsed && (
                  <span
                    className={`${
                      activeSection === section.title ? "font-bold" : "text-gray-300"
                    }`}
                  >
                    {section.title}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="absolute bottom-0 w-full p-5 space-y-3">
        <h2
          className={`p-2 rounded ${
            isCollapsed ? "text-center text-sm" : "bg-green-500 text-white text-center"
          }`}
        >
          {userName === "Loading..." ? "Fetching User..." : <Link href={`/profile/${userName}`}>{userName}</Link>}
        </h2>
        <button
          onClick={logout}
          className="w-full flex items-center p-3 space-x-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          aria-label="Logout"
        >
          <FaCog size={24} className={isCollapsed ? "mx-auto" : "text-gray-400"} />
          {!isCollapsed && <span className="text-gray-300">Log Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
