import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";

const UploadGallery = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchImages();
    fetchVideos();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/images`);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/videos`);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleShare = (mediaUrl: any) => {
    // Implement your share functionality here
    console.log("Sharing media:", mediaUrl);
  };

  const urlCreator = (endpoint: string) => {
    return `http://localhost:3030${endpoint}`;
  };

  return (
    <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Media Gallery
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Share your media with friends
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="w-full bg-gray-200 p-10 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Images</h3>
            <div className="flex ">
              {images.map((image, index) => {
                console.log("here is data", urlCreator(image));
                return (
                  <div
                    key={index}
                    className="flex flex-col border border-gray-800 rounded-lg py-6 items-center"
                  >
                    <img
                      src={urlCreator(image)}
                      alt={`Image ${index}`}
                      className="rounded-lg w-full w-40"
                    />
                    <button
                      onClick={() => handleShare(urlCreator(image))}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                    >
                      Share
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full bg-gray-200 p-10 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Videos</h3>
            <div className="grid grid-cols-2 gap-4">
              {videos && videos.length > 0 ? (
                videos.map((video, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <video controls className="rounded-lg w-full">
                      <source src={urlCreator(video)} />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={() => handleShare(urlCreator(video))}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                    >
                      Share
                    </button>
                  </div>
                ))
              ) : (
                <div>No videos to show!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadGallery;
