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
    form.append('video', file); // Change 'file' to 'video'
    
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Video</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter video title"
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-lg font-semibold">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Enter tags (comma-separated)"
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block text-lg font-semibold">Video</label>
          <input
            type="file"
            name="video"
            id="video"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 mt-6 text-lg font-semibold rounded-lg shadow-md ${uploading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-all ease-in-out duration-200`}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
