import React, { useState } from 'react';

const Post = ({ post, onLike, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(post._id, commentText);
      setCommentText(''); // Clear the input after submitting
    }
  };

  return (
    <div className="post">
      <h3>{post.author.username}</h3>
      <p>{post.content}</p>

      {/* Like Button */}
      <button onClick={onLike}>
        {post.likes.includes(localStorage.getItem('userId')) ? 'Unlike' : 'Like'}
      </button>
      <span>{post.likes.length} Likes</span>

      {/* Comments Section */}
      <div className="comments">
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <strong>{comment.user.username}:</strong> {comment.text}
          </div>
        ))}
        <form onSubmit={handleSubmitComment}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default Post;
