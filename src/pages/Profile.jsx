// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import UsersList from "./UsersList";
// eslint-disable-next-line no-unused-vars
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const { data } = await API.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      setUploading(true);
      const { data } = await API.post("/users/uploadProfileImage", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser((prevUser) => ({ ...prevUser, profileImage: data.profileImage }));
      alert("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("Failed to upload profile image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-800 text-white flex flex-col lg:flex-row">
      {/* Left section: Profile details */}
      <div className="w-full lg:w-3/12 p-8 lg:p-12 bg-gray-800 bg-opacity-70 rounded-lg shadow-2xl">
        {user ? (
          <div className="relative max-w-md w-full bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="relative flex justify-center mb-6">
              <div className="relative w-32 h-32 rounded-full bg-gray-700 overflow-hidden border-4 border-gradient-to-r from-blue-500 to-indigo-600">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-300">
                    <span className="text-xl font-bold">+</span>
                  </div>
                )}
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-1 right-1 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-all ease-in-out duration-200"
                >
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  📷
                </label>
              </div>
            </div>
            <h1 className="text-4xl font-semibold mb-4 text-center">Profile</h1>
            <div className="mb-6">
              <label className="block font-semibold text-lg">Name:</label>
              <p className="text-xl">{user.name}</p>
            </div>
            <div className="mb-6">
              <label className="block font-semibold text-lg">Email:</label>
              <p className="text-xl">{user.email}</p>
            </div>
            <div className="mb-6">
              <label className="block font-semibold text-lg">Role:</label>
              <p className="text-xl">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 w-full py-2 text-white rounded-lg text-lg hover:bg-red-700 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-400">Loading profile...</p>
        )}
      </div>

      {/* Right section: Users List + Explore Video */}
      <div className="w-full lg:w-9/12 p-8 lg:p-12 bg-gray-800 bg-opacity-70">
        <UsersList />

        {/* Explore Video Button */}
        <div className="w-full mt-8">
          <Link
            to="/VideoPage"
            className="block w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center font-semibold rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all ease-in-out duration-300 transform hover:scale-105"
          >
            Explore Videos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
