import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const Chat = ({ token, conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.emit("joinConversation", conversationId);

    newSocket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [conversationId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${conversationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [conversationId, token]);

  const handleSendMessage = async () => {
    const message = { conversationId, text: newMessage };

    try {
      const res = await axios.post("http://localhost:5000/api/messages", message, {
        headers: { Authorization: `Bearer ${token}` },
      });
      socket.emit("sendMessage", res.data);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl h-full">
      <h2 className="text-2xl font-semibold mb-4 text-white">Chat</h2>
      <div className="h-96 overflow-y-scroll bg-gray-700 p-4 rounded-lg shadow-md mb-4">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-3 text-white">
            <strong>{msg.sender.name}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-3 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700 transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
