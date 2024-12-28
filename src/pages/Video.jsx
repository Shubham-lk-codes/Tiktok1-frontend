// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import API from '../utils/api';
import VideoCard from '../components/VideoCard';

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef([]);
  const debounceTimeout = useRef(null); // For debouncing

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await API.get('/videos');
        setVideos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    // Pause all videos except the active one
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  const debounce = (callback, delay) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(callback, delay);
  };

  const handleScroll = (e) => {
    debounce(() => {
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        videos.length - 1
      );
      if (nextIndex !== currentIndex) {
        setCurrentIndex(nextIndex);
      }
    }, 300); // Adjust the debounce delay as needed
  };

  return (
    <div
      className="min-h-screen  text-white overflow-hidden"
      onWheel={handleScroll}
    >
      {isLoading ? (
        <p className="text-center text-lg">Loading videos...</p>
      ) : (
        <div className="h-screen">
          {videos.map((video, index) => (
            <div
              key={video?._id || index}
              className={`h-screen flex items-center justify-center transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <VideoCard
                video={video}
                isActive={index === currentIndex}
                videoRef={(el) => (videoRefs.current[index] = el)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoPage;
