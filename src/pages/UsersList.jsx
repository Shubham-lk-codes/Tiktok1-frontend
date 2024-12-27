// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import API from "../utils/api";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await API.get("/users", config);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const nextUser = () => {
    if (currentIndex < users.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevUser = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (loading) {
    return <p className="text-center text-gray-400 text-lg">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  const currentUser = users[currentIndex];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-purple-800 via-indigo-900 to-blue-900 text-white rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold text-center mb-8">Users List</h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-300">No users found</p>
      ) : (
        <div className="relative flex flex-col items-center bg-gray-800 bg-opacity-90 p-6 rounded-2xl shadow-lg space-y-6">
          {/* Previous Button */}
          <button
            className="absolute left-4 text-4xl text-indigo-400 hover:text-indigo-500 disabled:text-gray-600 disabled:cursor-not-allowed transform hover:scale-110 transition duration-200"
            onClick={prevUser}
            disabled={currentIndex === 0}
          >
            &#8592;
          </button>

          {/* User Profile */}
          {currentUser.profileImage && (
            <img
              src={currentUser.profileImage}
              alt="User Profile"
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-gradient-to-r from-blue-500 to-purple-500"
            />
          )}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-semibold">{currentUser.name}</h2>
            <p className="text-lg text-gray-300">
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p className="text-lg text-gray-300">
              <strong>Role:</strong> {currentUser.role}
            </p>
          </div>

          {/* Action Button */}
          <button className="px-8 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-lg font-medium hover:bg-gradient-to-l transform hover:scale-105 transition-all">
            View Profile
          </button>

          {/* Next Button */}
          <button
            className="absolute right-4 text-4xl text-indigo-400 hover:text-indigo-500 disabled:text-gray-600 disabled:cursor-not-allowed transform hover:scale-110 transition duration-200"
            onClick={nextUser}
            disabled={currentIndex === users.length - 1}
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersList;
