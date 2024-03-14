import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/router";
import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const validFileTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/quicktime",
      "video/mpeg",
    ];
    if (!validFileTypes.includes(file.type)) {
      console.error(
        "Invalid file type. Please select an image (JPEG, PNG, GIF) or a video (MP4, MOV, MPEG)."
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${BACKEND_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.message === "File uploaded successfully") {
        router.reload();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <div className="relative block bg-owhib m-4 sm:m-8 border border-gray-300 py-6 px-4 sm:px-8 lg:px-6 lg:rounded-0 cursor-default shadow-2xl">
        <h2 className="block text-lg lg:text-xl font-bold uppercase text-gray-900 mb-2 mr-3">
          Upload Files
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2 border border-dashed border-gray-300 p-4 bg-white relative">
            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Upload File
                <span className="font-medium text-red-700"> *</span>
              </label>
              <input
                id="#"
                type="file"
                onChange={handleFileChange}
                className="block w-full bg-transparent hover:border-primch hover:file:bg-primch focus:bg-white focus:ring-1 focus:ring-primch focus:border-primch py-2 px-3 leading-5 sm:text-sm text-gray-900 placeholder:text-gray-600 border border-gray-300 rounded-0 file:cursor-pointer file:border-0 file:bg-primcm file:h-[36px] file:-ml-3 file:-my-2 file:px-3 file:text-black"
              />
              <button
                type="submit"
                className="px-4 flex gap-x-2 py-2 mt-3 bg-gray-200 border-gray-400 hover:bg-gray-300 border rounded-lg"
              >
                <span>Upload</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FileUpload;
