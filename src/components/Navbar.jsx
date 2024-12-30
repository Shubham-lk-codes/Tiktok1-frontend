// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await API.get(`/videos/search?query=${searchQuery}`);
      navigate('/VideoPage', { state: { videos: response.data } });
    } catch (error) {
      console.error('Error searching videos:', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-wrap justify-between items-center relative fixed">
      {/* Left section: App name */}
      <h1 className="text-lg font-bold">TikTok App</h1>

      {/* Hamburger Menu Button */}
      <button
        className="lg:hidden text-white text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        &#9776; {/* Hamburger icon */}
      </button>

      {/* Search form */}
      <form
        onSubmit={handleSearch}
        className="flex items-center mt-2 md:mt-0 w-full md:w-[30vw] transition-all duration-200"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search videos..."
          className="px-4 py-2 rounded-l text-white bg-black border border-gray-600 w-full md:w-[200px]"
        />
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded-r text-white"
        >
          Search
        </button>
      </form>

      {/* Right section: Links */}
      <div
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } lg:flex items-center space-x-4 mt-2 md:mt-0 w-full lg:w-auto`}
      >
        {token ? (
          <>
            <Link
              to="/upload"
              className="text-white hover:text-blue-300 border-blue-500 bg-black px-4 py-2 rounded"
            >
              Upload Video
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile menu (for smaller screens) */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-50 transition-all duration-300 ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          {token ? (
            <>
              <Link
                to="/upload"
                className="text-white hover:text-blue-300 bg-black px-4 py-2 rounded"
              >
                Upload Video
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
