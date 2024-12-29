// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  FaHome,
  FaVideo,
  FaUser,
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-gradient-to-br from-gray-900 via-purple-500 to-black shadow-lg border-t  border-gray-300">
      <div className="flex justify-around items-center py-3">
        <Link to="/AuthHome">
        <button className="flex flex-col items-center  hover:text-blue-500">
          <FaHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </button>
        </Link>
        
          <Link to="/videopage">
          <button className="flex flex-col items-center  hover:text-blue-500">
            <FaVideo className="text-2xl" />
            <span className="text-xs">Videos</span>
            </button>
          </Link>

          <Link to="/upload">
       
        <button className="flex flex-col items-center  hover:text-blue-500">
          <FaPlusCircle className="text-2xl" />
          <span className="text-xs">Add</span>
        </button>
        </Link>
        <button className="flex flex-col items-center  hover:text-blue-500">
          <FaSearch className="text-2xl" />
          <span className="text-xs">Search</span>
        </button>
        <button className="flex flex-col items-center  hover:text-blue-500">
          <FaUser className="text-2xl" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Footer;
