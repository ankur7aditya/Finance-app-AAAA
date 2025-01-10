import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to store user details
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const email = localStorage.getItem("email"); // Retrieve email from localStorage
      if (!email) {
        console.error("No email found in localStorage");
        return;
      }
      
      try {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/dealer/profile?email=${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    
      {/* Top bar with Back button */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button
          onClick={handleBack}
          className="mr-4 text-xl font-semibold hover:bg-blue-700 p-2 rounded"
        >
          &#8592; Back
        </button>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="flex justify-center mt-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
          <div className="flex justify-center mb-6">
            {/* Avatar or Placeholder for Profile Picture */}
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-lg">Name:</span>
              <span className="text-gray-600">{user.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-lg">ID:</span>
              <span className="text-gray-600">{user._id}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-lg">Email ID:</span>
              <span className="text-gray-600">{user.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-lg">Reporting Manager:</span>
              {/* <span className="text-gray-600">{user.reportingManager}</span> */}
              <span className="text-gray-600">---</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-lg">Designation:</span>
              {/* <span className="text-gray-600">{user.designation}</span> */}
              <span className="text-gray-600">Dealer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
