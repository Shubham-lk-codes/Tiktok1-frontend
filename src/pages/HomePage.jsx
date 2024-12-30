

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersList from "./UsersList";
import API from "../utils/api";

const HomePage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await API.get('/videos'); // Update URL as per your backend route
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Top Navigation Bar */}

      {/* Sidebar */}

      {/* Main Content */}
      <div className="lg:ml-[16vw] pt-20 pb-16">
        <div className="max-w-4xl mx-auto space-y-6 px-4">
          <UsersList />

          {/* Video Feed */}
          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video._id}
                className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col space-y-4"
              >
                <div className="aspect-w-6 aspect-h-6 bg-black rounded-lg overflow-hidden">
                  <video
                    className="w-full h-[80vh] object-cover"
                    controls
                    src={video.url} // Use the URL fetched from the backend
                    alt={video.title}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{video.title}</h2>
                  <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                    Like
                  </button>
                </div>
                <p className="text-gray-400">{video.description || "No description available."}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No videos available.</p>
          )}
        </div>
      </div>

      {/* Bottom Navigation for Smaller Screens */}
    </div>
  );
};

export default HomePage;

