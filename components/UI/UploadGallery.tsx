import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";
import toast from "react-hot-toast";

const UploadGallery = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const notify = () => toast("Here is your toast.");

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

  const handleShare = async (mediaUrl: string) => {
    try {
      await navigator.clipboard.writeText(mediaUrl);
      await notify();
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const urlCreator = (endpoint: string) => {
    return `${BACKEND_URL}/${endpoint}`;
  };

  return (
    <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
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
          <div className="w-full bg-gray-100 border-gray-300 border p-10 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Images</h3>
            <div className="flex gap-5">
              {images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col border border-gray-800 rounded-lg py-6 items-center"
                  >
                    <img
                      src={urlCreator(image)}
                      alt={`Image ${index}`}
                      className="rounded-lg w-full w-40 h-40 object-cover"
                    />
                    <button
                      onClick={() => handleShare(urlCreator(image))}
                      className="mt-2 gap-x-2 flex px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                    >
                      <span> Copy Link</span> <IconBxsCopy />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full bg-gray-100 border-gray-300 border p-10 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Videos</h3>
            <div className="flex rounded-lg">
              {videos && videos.length > 0 ? (
                videos.map((video, index) => (
                  <div
                    key={index}
                    className="flex flex-col border border-gray-800 rounded-lg py-6 items-center"
                  >
                    <video controls className="rounded-lg w-40 h-40">
                      <source src={urlCreator(video)} />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={() => handleShare(urlCreator(video))}
                      className="mt-2 flex gap-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                    >
                      <span> Copy Link</span> <IconBxsCopy />
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

function IconBxsCopy(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2z" />
      <path d="M20 2H10a2 2 0 00-2 2v2h8a2 2 0 012 2v8h2a2 2 0 002-2V4a2 2 0 00-2-2z" />
    </svg>
  );
}

export default UploadGallery;
