// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import VideoPage from "../pages/Video";
import UploadVideo from "../pages/UploadVideo";
import Profile from "../pages/Profile";
import HomePage from "../pages/HomePage";
import {
  FaHome,
  FaVideo,
  FaUser,
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const SidebarFooter = () => {
  const [activeContent, setActiveContent] = useState("home"); // State to control right-side content

  // Utility class for sidebar buttons
  const buttonClass = `
    flex items-center text-lg py-2 px-4 rounded-md w-full 
    hover:bg-blue-500 hover:text-white transition duration-300
  `;

  const footerButtonClass = `
    flex flex-col items-center hover:bg-blue-500 hover:text-white p-2 
    rounded-md transition duration-300 
  `;

  // Right-side content to display based on state
  const renderContent = () => {
    switch (activeContent) {
      case "home":
        return (
          <div className="">
            <HomePage />
          </div>
        );
      case "videos":
        return (
          <div className="">
            <VideoPage />
          </div>
        );
      case "add":
        return (
          <div className="">
            <UploadVideo />
          </div>
        );
      case "search":
        return <div className="">Search for something...</div>;
      case "profile":
        return (
          <div className="p-">
            <Profile />
          </div>
        );
      default:
        return <div className="">Select an option from the sidebar.</div>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar for large screens */}
      <div className="hidden lg:fixed lg:left-0 lg:top-19 lg:h-full lg:w-[16vw] lg:bg-gradient-to-br lg:from-gray-900 lg:via-purple-500 lg:to-black lg:shadow-lg lg:border-r lg:border-gray-300 lg:flex lg:flex-col lg:justify-around lg:items-center py-6 space-y-4">
        <button
          className={buttonClass}
          onClick={() => setActiveContent("home")}
        >
          <FaHome className="mr-5 text-xl" />
          <span>Home</span>
        </button>
        <button
          className={buttonClass}
          onClick={() => setActiveContent("videos")}
        >
          <FaVideo className="mr-5 text-xl" />
          <span>Videos</span>
        </button>
        <button className={buttonClass} onClick={() => setActiveContent("add")}>
          <FaPlusCircle className="mr-5 text-xl" />
          <span>Add</span>
        </button>
        <button
          className={buttonClass}
          onClick={() => setActiveContent("search")}
        >
          <FaSearch className="mr-5 text-xl" />
          <span>Search</span>
        </button>
        <button
          className={buttonClass}
          onClick={() => setActiveContent("profile")}
        >
          <FaUser className="mr-5 text-xl" />
          <span>Profile</span>
        </button>
      </div>

      {/* Right-side content */}
      <div className="lg:ml-[16vw] w-full lg:w-[84vw] bg-gray-100">
        {renderContent()}
      </div>

      {/* Footer for smaller screens */}
      <div className="lg:hidden fixed bottom-0 w-full bg-gradient-to-br from-gray-900 via-purple-500 to-black shadow-lg border-t border-gray-300 flex justify-around items-center py-3">
        <Link to="/AuthHome">
          <button className={footerButtonClass}>
            <FaHome className="text-2xl" />
            <span className="text-xs">Home</span>
          </button>
        </Link>
        <Link to="/videopage">
          <button className={footerButtonClass}>
            <FaVideo className="text-2xl" />
            <span className="text-xs">Videos</span>
          </button>
        </Link>
        <Link to="/upload">
          <button className={footerButtonClass}>
            <FaPlusCircle className="text-2xl" />
            <span className="text-xs">Add</span>
          </button>
        </Link>
        {/* <button className={footerButtonClass}>
          <FaSearch className="text-2xl" />
          <span className="text-xs">Search</span>
        </button> */}
        <Link to="/profile">
          <button className={footerButtonClass}>
            <FaUser className="text-2xl" />
            <span className="text-xs">Profile</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SidebarFooter;
