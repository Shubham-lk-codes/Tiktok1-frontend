// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Conversations from "../components/Conversations";
import Chat from "../components/Chat";
import SearchUsers from "../components/SearchUsers";

const ChatPage = () => {
  const location = useLocation();
  const [selectedConversation, setSelectedConversation] = useState(
    location.state?.conversationId || null
  );
  const [refreshConversations, setRefreshConversations] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (location.state?.conversationId) {
      setSelectedConversation(location.state.conversationId);
    }
  }, [location]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white">
      {/* Sidebar for Search & Conversations */}
      <div className="w-full lg:w-1/3 bg-gradient-to-b from-purple-800 to-gray-900 p-6 lg:p-12">
        <SearchUsers
          token={token}
          onStartConversation={() => setRefreshConversations(!refreshConversations)}
        />
        <Conversations
          token={token}
          onSelectConversation={setSelectedConversation}
          refresh={refreshConversations}
        />
      </div>

      {/* Chat Window */}
      <div className="w-full lg:w-2/3 p-6 lg:p-12 bg-gradient-to-t from-gray-800 to-gray-900">
        {selectedConversation ? (
          <Chat token={token} conversationId={selectedConversation} />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-700 rounded-lg shadow-xl">
            <p className="text-xl text-gray-400">Select a conversation to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
