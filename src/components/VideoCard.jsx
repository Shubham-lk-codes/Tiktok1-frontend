/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const VideoCard = ({ video }) => {
  if (!video) {
    return <div className="text-red-500 text-center font-medium">Video data is not available</div>;
  }

  const {
    title = 'Untitled',
    url = '',
    creator = {},
    tags = [],
    ratings = [],
    comments = [],
  } = video;

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1)
      : null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      {/* Video Title */}
      <h3 className="text-xl font-bold text-gray-900 truncate">{title}</h3>

      {/* Video Player */}
      <div className="mt-4">
        <video controls className="w-full rounded-lg">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Details */}
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium">
          Uploaded by: <span className="text-gray-800">{creator?.name || 'Unknown Creator'}</span>
        </p>
        <p className="mt-1">
          Tags: <span>{tags.length > 0 ? tags.join(', ') : 'No tags available'}</span>
        </p>
      </div>

      {/* Ratings Section */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-800">Ratings:</h4>
        <p className="text-gray-600">
          {averageRating ? `Average Rating: ${averageRating}` : 'No ratings yet'}
        </p>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-800">Comments:</h4>
        {comments.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {comments.map((comment, index) => (
              <li
                key={index}
                className="p-3 bg-gray-100 rounded-lg shadow-sm text-sm text-gray-700"
              >
                <strong className="text-gray-900">{comment?.user?.name || 'Anonymous'}:</strong>{' '}
                {comment.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
