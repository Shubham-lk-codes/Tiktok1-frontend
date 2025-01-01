/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";

const SearchUsers = ({ token, onStartConversation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`https://tiktok1-backend.onrender.com/api/users?search=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartConversation = async (recipientId) => {
    try {
      await axios.post(
        "https://tiktok1-backend.onrender.com/api/conversations",
        { recipientId, message: "Hello!" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onStartConversation();
      setSearchQuery("");
      setUsers([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Search Users</h2>
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for users..."
          className="w-full p-3 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-all duration-300"
        >
          Search
        </button>
      </div>

      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => handleStartConversation(user._id)}
            className="cursor-pointer bg-gray-800 p-3 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200"
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUsers;
