import React, { useState } from "react";

const WelcomeBackPage = () => {
  const [files, setFiles] = useState([]);
  const [shareLink, setShareLink] = useState("");

  // Function to handle file upload
  const handleFileUpload = (event: any) => {
    const uploadedFiles = event.target.files;
    setFiles(uploadedFiles);
  };

  // Function to generate share link
  const generateShareLink = () => {
    // Assuming the files are images and we want to share the first one
    const imageUrl = URL.createObjectURL(files[0]);
    setShareLink(imageUrl);
  };

  return (
    <div>
      <h1>Welcome Back!</h1>
      <input type="file" onChange={handleFileUpload} multiple />
      <button onClick={generateShareLink}>Generate Share Link</button>

      {/* Display uploaded files */}
      {files.length > 0 && (
        <div>
          <h2>Uploaded Files:</h2>
          {Array.from(files).map((file, index) => (
            <div key={index}>
              <img src={URL.createObjectURL(file)} alt={`File ${index}`} />
            </div>
          ))}
        </div>
      )}

      {/* Display share link */}
      {shareLink && (
        <div>
          <h2>Share Link:</h2>
          <input type="text" value={shareLink} readOnly />
        </div>
      )}
    </div>
  );
};

export default WelcomeBackPage;
