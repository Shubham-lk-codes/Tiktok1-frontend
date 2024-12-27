import Login from "../pages/Login";
import { Link } from "react-router-dom";

const UnuthHome = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-indigo-800 text-white flex-col lg:flex-row">
      {/* Left Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 py-12 lg:px-16 lg:py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-6">
            TikTok
          </h1>
          <div className="w-full mb-4">
            <Login />
          </div>
          <Link
            to="/forgot-password"
            className="block text-gray-300 hover:text-white text-sm mt-2"
          >
            Forgot Password?
          </Link>
          <div className="mt-6">
            <p className="text-gray-300">Don’t have an account?</p>
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Get the App</h2>
          <div className="flex justify-center space-x-6">
            <img src="app.png" alt="App Store" className="w-32 h-auto rounded-md shadow-lg" />
            <img src="play1.png" alt="Google Play" className="w-32 h-auto rounded-md shadow-lg" />
          </div>
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

export default UnuthHome;
