/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-bold">{video.title}</h3>
      <video controls className="w-full mt-2">
        <source src={video.url} type="video/mp4" />
      </video>

      <div className="text-sm text-gray-500 mt-2">
        <p>Uploaded by: {video.creator.name}</p>
        <p>Tags: {video.tags.join(', ')}</p>
      </div>

      {/* Ratings Section */}
      <div className="mt-3">
        <h4 className="font-semibold">Ratings:</h4>
        <p>
          Average Rating:{' '}
          {video.ratings.length > 0
            ? (video.ratings.reduce((acc, r) => acc + r.rating, 0) / video.ratings.length).toFixed(1)
            : 'No ratings yet'}
        </p>
      </div>

      {/* Comments Section */}
      <div className="mt-3">
        <h4 className="font-semibold">Comments:</h4>
        {video.comments.length > 0 ? (
          <ul className="list-disc list-inside">
            {video.comments.map((comment, index) => (
              <li key={index} className="text-sm text-gray-700">
                <strong>{comment.user.name}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
