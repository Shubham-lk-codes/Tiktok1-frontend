import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ userId, currentUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [message, setMessage] = useState(""); // State for the message input
  const [userProfile, setUserProfile] = useState({
    username: "",
    profilePicture: "",
    following: 0,
    followers: 0,
    followersList: [],
    followingList: [],
  });

  const navigate = useNavigate(); // For navigation

  const fetchProfileData = async () => {
    if (!userId) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { name, profileImage, following, followers } = response.data;
      setUserProfile({
        username: name,
        profilePicture: profileImage,
        following: following.length,
        followers: followers.length,
        followersList: followers,
        followingList: following,
      });

      setIsFollowing(followers.some((follower) => follower._id === currentUserId));
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [userId]);

  const handleFollowToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:5000/api/users/${userId}/${isFollowing ? "unfollow" : "follow"}`;

      await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });

      setIsFollowing(!isFollowing);
      fetchProfileData();
    } catch (error) {
      console.error("Error toggling follow status", error.response.data);
    }
  };

  // const handleStartConversation = async () => {
  //   if (!userId || !currentUserId) {
  //     alert("User ID or Current User ID is missing.");
  //     return;
  //   }

  //   if (!message.trim()) {
  //     alert("Please enter a message to start a conversation.");
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem("token");

  //     const response = await axios.post(
  //       "http://localhost:5000/api/conversations",
  //       { participants: [currentUserId, userId], message },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     const conversationId = response.data._id; // Assuming the conversation ID is in the response
  //     alert("Conversation started successfully!");

  //     // Redirect to chat page with conversationId
  //     navigate("/chat", { state: { conversationId } });
  //   } catch (error) {
  //     console.error("Error starting conversation", error.response?.data || error.message);
  //   }
  // };


  const handleStartConversation = async () => {
    if (!userId || !currentUserId) {
      console.error("UserId or CurrentUserId is missing.");
      alert("UserId or CurrentUserId is missing.");
      return;
    }
  
    if (!message.trim()) {
      alert("Please enter a message to start a conversation.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      // Use 'recipient' field as expected by the backend
      const response = await axios.post(
        "http://localhost:5000/api/conversations",
        {
          recipient: userId, // Single recipient
          initialMessage: message, // Explicitly name the message field
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log("Conversation started:", response.data);
      alert("Conversation started successfully!");
  
      // Redirect to the chat page with the conversationId
      window.location.href = `/chat?conversationId=${response.data._id}`;
    } catch (error) {
      console.error("Error starting conversation", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={userProfile.profilePicture || "/default-profile.png"}
          alt="Profile"
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleFollowToggle}
          className={`absolute bottom-4 right-4 px-4 py-2 rounded-full text-white ${
            isFollowing ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{userProfile.username || "Unknown User"}</h3>
        <div className="flex space-x-6 mt-3">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Following</p>
            <span className="text-lg font-semibold">{userProfile.following}</span>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Followers</p>
            <span className="text-lg font-semibold">{userProfile.followers}</span>
          </div>
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Send a message to start a conversation..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
          <button
            onClick={handleStartConversation}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
