import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/FeedPost';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://tiktok1-backend.onrender.com/api/posts/getprop', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token logic
          },
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Handle liking a post
  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `https://tiktok1-backend.onrender.com/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Update posts state with the updated post data
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? response.data.post : post))
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // Handle adding a comment
  const handleAddComment = async (postId, commentText) => {
    try {
      const response = await axios.post(
        `https://tiktok1-backend.onrender.com/api/posts/${postId}/comment`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Update posts state with the updated post data
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? response.data.post : post))
      );
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="feed">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onLike={() => handleLike(post._id)}
            onAddComment={handleAddComment}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Feed;
