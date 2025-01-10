import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Pan = (id) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const loanID = location.state.loanId;
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description) {
      setMessage("Please provide both an image and a description.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", description);

    try {
      const response = await axios.post(
        `${REACT_APP_BACKEND_URL}/upload/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Chassis uploaded successfully!");
      // console.log(response.data);
      const URL = response.data;
      // console.log(URL);
      if (!URL) {
        setMessage("Failed to upload post. Please try again.");
        return;
      }
      // Prepare document data
      const documentData = {
        loanId: loanID, // Replace with actual loan ID
        url: URL,
        panNumber: description,
      };

      // Post document data to the collection
      const documentResponse = await axios.post(
        `${REACT_APP_BACKEND_URL}/customers/upload-loan/pan`,
        documentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Document added successfully:", documentResponse.data);

      navigate(-1);
    } catch (error) {
      setMessage("Failed to upload post. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Upload PAN
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-700"
            >
              PAN Card Image Upload:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              PAN Number:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter the chassis number"
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Submit
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-lg font-medium ${
              message.includes("Failed") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Pan;
