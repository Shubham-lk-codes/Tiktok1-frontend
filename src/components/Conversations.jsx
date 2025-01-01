/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

const Conversations = ({ token, onSelectConversation, refresh }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get("https://tiktok1-backend.onrender.com/api/conversations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConversations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchConversations();
  }, [token, refresh]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-white mb-6">Conversations</h2>
      <ul className="space-y-3">
        {Array.isArray(conversations) && conversations.length > 0 ? (
          conversations.map((conversation) => (
            <li
              key={conversation._id}
              onClick={() => onSelectConversation(conversation._id)}
              className="cursor-pointer p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200"
            >
              <strong className="text-white">{conversation.participants.map((p) => p.name).join(", ")}</strong>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No conversations available.</p>
        )}
      </ul>
    </div>
  );
};

export default Conversations;
