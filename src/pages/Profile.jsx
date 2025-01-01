import React, { useEffect, useState } from "react";
import API from "../utils/api"; // Ensure API is properly imported for making requests
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState([]); // State to hold posts
  const [imageFile, setImageFile] = useState(null); // New state to hold the selected image for profile
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const { data } = await API.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    const fetchPosts = async () => {
      try {
        const { data } = await API.get("/posts/getprop", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(data)) {
          setPosts(data); // Expected case: data is an array of posts
        } else {
          console.warn("Posts data is not an array:", data);
          setPosts([]); // Fallback: Set posts to an empty array
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Failed to load posts.");
      }
    };

    fetchUserProfile();
    fetchPosts(); // Fetch posts when the profile is loaded
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!caption || !postImage) {
      alert("Both caption and image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", postImage); // Append image file

    try {
      setUploading(true);
      // Post the form data to the backend
      const { data } = await API.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
          "Content-Type": "multipart/form-data", // Ensures the form data is correctly processed
        },
      });

      alert("Post uploaded successfully!");
      setCaption(""); // Clear caption after post
      setPostImage(null); // Clear image after post

      if (data && data.post) {
        setPosts([data.post, ...posts]); // Add the new post to the state
      } else {
        console.error("Invalid post data:", data);
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Failed to upload the post.");
    } finally {
      setUploading(false);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleProfileImageUpload = async () => {
    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      const { data } = await API.post("users/uploadProfileImage", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Ensure the backend can process the file upload
        },
      });

      alert("Profile image updated successfully!");
      setUser((prevUser) => ({ ...prevUser, profileImage: data.profileImage }));
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("Failed to upload the profile image.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 p-8 lg:p-12 bg-gray-800 bg-opacity-70 rounded-lg shadow-xl">
        {user ? (
          <div className="relative max-w-md mx-auto bg-gradient-to-br from-purple-800 to-gray-900 p-6 rounded-xl shadow-lg">
            <div className="relative flex justify-center mb-6">
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-purple-500 shadow-md">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-700 text-gray-300">
                    <span className="text-2xl font-bold">+</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="absolute bottom-0 right- mb-2 ml-5 bg-gray-600 text-white px-2 py-1 rounded-full cursor-pointer"
              />
            </div>

            <button
              onClick={handleProfileImageUpload}
              className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              Upload Profile Image
            </button>

            <h1 className="text-3xl font-extrabold text-center mb-6">{user.name}</h1>

            <button
              onClick={handleLogout}
              className="mt-6 w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-center">Loading profile...</p>
        )}
      </div>

      <div className="w-full lg:w-2/3 p-8 lg:p-12">
        <h2 className="text-2xl font-bold mb-6">Create a New Post</h2>
        <form onSubmit={handlePostSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium">Caption:</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
              placeholder="Enter your caption"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Post Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPostImage(e.target.files[0])}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300"
          >
            {uploading ? "Uploading..." : "Post"}
          </button>
        </form>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Your Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-400">No posts yet. Create one!</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="mb-6 bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="text-lg font-semibold text-white">{post.caption}</div>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="mt-4 w-full h-auto rounded-lg"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
