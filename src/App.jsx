// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UploadVideo from "./pages/UploadVideo";
import Register from "./pages/Register";
import AuthHome from "./components/AuthHome";
import VideoPage from "./pages/Video";
import UnuthHome from "./components/UnauthHome";
import Profile from "./pages/Profile";
import UsersList from "./pages/UsersList";
import Footer from "./components/Footer";
import ChatPage from "./pages/ChatPage";

import ProfilePage from "./pages/ParentUserpage";
const App = () => {
  const [token, setToken] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Load token from local storage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Load currentUserId from local storage on initial render
  useEffect(() => {
    const currentUser = localStorage.getItem("userId"); // Make sure the key is correct
    if (currentUser) {
      setCurrentUserId(currentUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/unauthhome" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/videopage" element={<VideoPage />} />
        <Route path="/authhome" element={<AuthHome />} />
        <Route path="/" element={<UnuthHome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/chat" element={<ChatPage token={token} />} />
        <Route path="/profile/:userId" element={<ProfilePage CurrentUserId={currentUserId} />} />
      </Routes>
    </Router>
  );
};

export default App;
