// eslint-disable-next-line no-unused-vars
import React from "react";
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
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/UnauthHome" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/VideoPage" element={<VideoPage />} />
        <Route path="AuthHome" element={<AuthHome />} />
        <Route path="/" element={<UnuthHome />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Router>
  );
};

export default App;
