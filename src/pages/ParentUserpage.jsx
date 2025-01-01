import React from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../components/UserProfile";



 const ProfilePage = () => {
  const { userId } = useParams(); // Extract userId from the route

  if (!userId) {
      return <p className="text-center text-gray-400">User not found</p>;
  }

  return (
      <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>
          <ProfileCard userId={userId} currentUserId={localStorage.getItem("user")} />
      </div>
  );
};
export default ProfilePage
