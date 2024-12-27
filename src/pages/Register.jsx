/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "consumer", // Default role is 'consumer'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/users/register", formData);
      localStorage.setItem("token", data.token);
      alert("Registration successful!");
      navigate("/"); // Redirect to the homepage after successful registration
    } catch (error) {
      alert("Error during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-indigo-900 text-white flex-col lg:flex-row">
      {/* Left Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 py-12 lg:px-16 lg:py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Create Your Account
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm p-6 shadow-xl rounded-lg bg-gray-800"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full mb-4 p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full mb-4 p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
            <select
              name="role"
              className="w-full mb-4 p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="consumer">Consumer</option>
              <option value="creator">Creator</option>
            </select>
            <button
              type="submit"
              className={`bg-green-500 text-white px-4 py-3 rounded w-full font-bold hover:bg-green-400 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <Link
            to="/login"
            className="block text-gray-300 hover:text-white text-sm mt-4"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full lg:w-1/2 relative flex justify-center items-center bg-gray-900 overflow-hidden">
        <div className="relative w-full h-full flex justify-center items-center">
          <img
            src="1.jpg"
            alt="Background"
            className="absolute w-[45vw] lg:w-[30vw] rounded-lg h-[35vh] lg:h-[65vh] top-10 left-10 shadow-xl transform transition-all duration-500 hover:scale-105"
          />
          <img
            src="download.jpg"
            alt="Foreground"
            className="relative w-[45vw] lg:w-[30vw] rounded-lg h-[35vh] lg:h-[65vh] border-4 border-gray-700 shadow-xl shadow-blue-500/50 transform transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
