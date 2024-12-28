/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaHeart, FaComment, FaEye, FaShareAlt } from 'react-icons/fa';
import API from '../utils/api';

const VideoCard = ({ video, isActive, videoRef }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(video.comments || []);
  const [likes, setLikes] = useState(video.likes || 0);

  if (!video) {
    return (
      <div className="text-red-500 text-center font-medium">
        Video data is not available
      </div>
    );
  }

  const {
    title = 'Untitled',
    url = '',
    creator = {},
    views = 0,
  } = video;

  const handleLike = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await API.post(`/videos/${video._id}/rate`, { rating: 1 });
      setLikes((prev) => prev + 1); // Increment the like count locally
    } catch (error) {
      console.error('Error liking the video:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await API.post(`/videos/${video._id}/comment`, {
        text: newComment,
      });
      setComments(response.data.comments); // Update comments with the latest list
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="relative h-full flex flex-col justify-between items-center bg-black text-white rounded-xl p-6">
      {/* Video Player */}
      {isActive && (
        <div className="w-full h-3/4">
          <video
            ref={videoRef}
            controls
            className="w-full h-full rounded-lg"
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Overlay Icons */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 space-y-4 text-center">
        {/* Likes */}
        <div className="flex flex-col items-center">
          <FaHeart
            className="text-red-500 text-3xl cursor-pointer hover:scale-110 transition-transform"
            onClick={handleLike}
          />
          <span className="text-sm">{likes}</span>
        </div>

        {/* Comments */}
        <div className="flex flex-col items-center">
          <FaComment
            className="text-blue-500 text-3xl cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setCommentsVisible((prev) => !prev)}
          />
          <span className="text-sm">{comments.length}</span>
        </div>

        {/* Views */}
        <div className="flex flex-col items-center">
          <FaEye className="text-yellow-500 text-3xl cursor-pointer hover:scale-110 transition-transform" />
          <span className="text-sm">{views}</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center">
          <FaShareAlt className="text-green-500 text-3xl cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Comments Section */}
      {commentsVisible && (
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-900 p-4 overflow-y-scroll">
          <h3 className="text-xl font-bold mb-4">Comments</h3>
          <div className="space-y-2">
            {comments.map((comment, index) => (
              <div key={index} className="p-2 bg-gray-800 rounded">
                <p className="text-sm">
                  <strong>User:</strong> {comment.user}
                </p>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full p-2 bg-gray-800 rounded"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="w-full mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      )}

      {/* Video Details */}
      <div className="w-full mt-4 text-sm text-gray-300">
        <h3 className="text-xl font-bold truncate">{title}</h3>
        <p className="font-medium">
          Uploaded by:{' '}
          <span className="text-white">{creator?.name || 'Unknown Creator'}</span>
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
