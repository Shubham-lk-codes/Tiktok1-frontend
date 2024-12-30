/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import UsersList from "./UsersList";
import VideoPage from "./Video";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 p-8 lg:p-12 bg-gray-800 bg-opacity-70 rounded-lg shadow-xl">
        {user ? (
          <div className="relative max-w-md mx-auto bg-gradient-to-br from-purple-800 to-gray-900 p-6 rounded-xl shadow-lg">
            <div className="relative flex justify-center mb-6">
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-purple-500 shadow-md">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-700 text-gray-300">
                    <span className="text-2xl font-bold">+</span>
                  </div>
                )}
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-all ease-in-out duration-200"
                >
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  📸
                </label>
              </div>
            </div>

            <h1 className="text-3xl font-extrabold text-center mb-6">{user.name}</h1>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium">Email:</label>
                <p className="text-xl text-purple-300">{user.email}</p>
              </div>
              <div>
                <label className="block text-lg font-medium">Role:</label>
                <p className="text-xl text-purple-300 capitalize">{user.role}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-center">Loading profile...</p>
        )}
      </div>

    </div>
  );
};

export default Profile;
