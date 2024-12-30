// // eslint-disable-next-line no-unused-vars
// import React from "react";
// import UsersList from "./UsersList";

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
//       {/* Top Navigation Bar */}

//       {/* Sidebar */}

//       {/* Main Content */}
//       <div className="lg:ml-[16vw] pt-20 pb-16">
//         <div className="max-w-4xl mx-auto space-y-6 px-4">
//           <UsersList />
          
//           {/* Sample Video Feed */}
//           {[1, 2, 3].map((video, index) => (
//             <div
//               key={index}
//               className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col space-y-4"
//             >
//               <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
//                 <video
//                   className="w-full h-full object-cover"
//                   controls
//                   src={`https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_${
//                     index + 1
//                   }.mp4`}
//                   alt={`Video ${index + 1}`}
//                 />
//               </div>
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-bold">Video Title {index + 1}</h2>
//                 <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
//                   Like
//                 </button>
//               </div>
//               <p className="text-gray-400">
//                 This is a description of the video.
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Navigation for Smaller Screens */}
//     </div>
//   );
// };

// export default HomePage;

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersList from "./UsersList";
import API from "../utils/api";

const HomePage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await API.get('/videos'); // Update URL as per your backend route
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Top Navigation Bar */}

      {/* Sidebar */}

      {/* Main Content */}
      <div className="lg:ml-[16vw] pt-20 pb-16">
        <div className="max-w-4xl mx-auto space-y-6 px-4">
          <UsersList />

          {/* Video Feed */}
          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video._id}
                className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col space-y-4"
              >
                <div className="aspect-w-6 aspect-h-6 bg-black rounded-lg overflow-hidden">
                  <video
                    className="w-full h-[80vh] object-cover"
                    controls
                    src={video.url} // Use the URL fetched from the backend
                    alt={video.title}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{video.title}</h2>
                  <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                    Like
                  </button>
                </div>
                <p className="text-gray-400">{video.description || "No description available."}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No videos available.</p>
          )}
        </div>
      </div>

      {/* Bottom Navigation for Smaller Screens */}
    </div>
  );
};

export default HomePage;

