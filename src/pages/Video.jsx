// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import API from '../utils/api'; // API.js for connecting to the backend
import VideoCard from '../components/VideoCard'; // VideoCard Component for displaying video details
import { FaStar, FaComment } from 'react-icons/fa'; // Icons for rating and commenting

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch videos from the backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await API.get('/videos');
        setVideos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Handle video rating submission
  const handleRate = async (videoId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to submit a rating.');
        return;
      }

      await API.post(
        `videos/${videoId}/rate`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Rating submitted!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert(
        error.response?.data?.message || 'There was an error submitting your rating. Please try again later.'
      );
    }
  };

  // Handle comment submission
  const handleComment = async (videoId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to submit a comment.');
        return;
      }

      await API.post(
        `videos/${videoId}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Comment added!');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert(
        error.response?.data?.message || 'There was an error submitting your comment. Please try again later.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <h1 className="text-3xl font-extrabold text-center text-white mb-8">Videos</h1>

      {isLoading ? (
        <p className="text-center text-lg">Loading videos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video?._id || Math.random()}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <VideoCard video={video} />
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-yellow-400" />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="border p-2 rounded-md w-16 text-black"
                      placeholder="Rate (1-5)"
                    />
                  </div>
                  <button
                    onClick={() => handleRate(video._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 transition-all duration-300 hover:bg-blue-400"
                  >
                    Submit Rating
                  </button>
                </div>

                <div className="mt-4">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    rows="3"
                    className="border p-2 w-full rounded-md bg-gray-700 text-white placeholder-gray-400"
                  />
                  <button
                    onClick={() => handleComment(video._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 transition-all duration-300 hover:bg-green-400"
                  >
                    <FaComment className="inline-block mr-2" />
                    Submit Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoPage;
