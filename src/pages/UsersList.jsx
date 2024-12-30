// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import API from "../utils/api";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p className="text-center text-gray-400 text-lg">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  return (
    <div className="max-w-full mx-auto p-8 bg-gradient-to-r from-purple-800 via-indigo-900 to-blue-900 text-white rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold text-center mb-8">Users List</h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-300">No users found</p>
      ) : (
        <div className="flex overflow-x-auto space-x-6 py-4">
          {users.map((user, index) => (
            <div
              key={user._id || index}
              className="min-w-[250px] flex-shrink-0 flex flex-col items-center bg-gray-800 bg-opacity-90 p-6 rounded-2xl shadow-lg space-y-4"
            >
              {/* User Profile Image */}
              {user.profileImage && (
                <img
                  src={user.profileImage}
                  alt={`${user.name}'s Profile`}
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-gradient-to-r from-blue-500 to-purple-500"
                />
              )}
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-lg text-gray-300">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-lg text-gray-300">
                  <strong>Role:</strong> {user.role}
                </p>
              </div>

              {/* Action Button */}
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-lg font-medium hover:bg-gradient-to-l transform hover:scale-105 transition-all">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
