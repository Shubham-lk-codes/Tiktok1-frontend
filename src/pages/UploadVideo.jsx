// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import API from '../utils/api';

const UploadVideo = () => {
  const [formData, setFormData] = useState({ title: '', tags: '' });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('tags', formData.tags);
    form.append('video', file);

    setUploading(true);

    try {
      await API.post('/videos/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Video uploaded successfully');
    } catch (error) {
      console.log(error);
      alert('Error uploading video');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Upload Your Video
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Share your creativity with the world! Fill in the details and upload your video.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-200 mb-2"
            >
              Video Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter video title"
              className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="tags"
              className="block text-lg font-medium text-gray-200 mb-2"
            >
              Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Enter tags (comma-separated)"
              className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="video"
              className="block text-lg font-medium text-gray-200 mb-2"
            >
              Upload Video
            </label>
            <input
              type="file"
              name="video"
              id="video"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 px-6 text-lg font-semibold rounded-lg shadow-lg ${
              uploading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500'
            } text-white transition-all ease-in-out duration-300 transform ${
              uploading ? '' : 'hover:scale-105'
            }`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
