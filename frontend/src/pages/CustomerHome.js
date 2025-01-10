import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerHome = () => {
  // For demonstration, use a hardcoded username. You can replace it with the actual username after login.
  // const username = localStorage.getItem("email").split("@")[0];
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    setShowPopup(false);
    navigate("/"); // Redirect to the login page
    localStorage.removeItem("email"); // Remove email from local storage
  };

  const products = [
    {
      name: "Electric Three Wheeler Loan",
      imgSrc: "../assests/threeWheel.jpg",
    },
    { name: "Electric Two Wheeler Loan", imgSrc: "../assests/twoWheel.webp" },
    { name: "EV Ancillary Loan", imgSrc: "../assests/battery.webp" },
  ];
  const handleApplyLoan = () => {
    navigate("/customer-home/apply-loan");
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      {/* Top Section */}
      <div className="relative mb-8">
        {/* Logout Button */}
        <button
          className="relative top-0 right-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md m-4"
          onClick={() => setShowPopup(true)}
        >
          Logout
        </button>

        {/* Title and Welcome Message */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-700">AAAA Finances</h1>
          <h2 className="text-xl text-gray-600 mt-2">Welcome</h2>
        </div>
      </div>

      {/* Box with top and bottom sections */}
      <div className="bg-white rounded-lg shadow-lg h-[25vh] mb-8">
        {/* Top Section inside the box */}
        <div className="flex items-center justify-center h-1/2 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center rounded-t-lg">
          <p className="text-lg font-semibold">Get Your Financing Quickly</p>
        </div>

        {/* Bottom Section with Loan Apply button */}
        <div className="h-1/2 bg-gray-50 flex items-center justify-center rounded-b-lg">
          <button
            onClick={handleApplyLoan}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Apply for a Loan
          </button>
        </div>
      </div>

      {/* OUR Products Section */}
      <div className="text-center my-8">
        <h3 className="text-3xl font-bold text-gray-700 mb-4">Our Products</h3>
        <p className="text-gray-600 text-sm">
          Explore a variety of financial products tailored just for you.
        </p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <img
              src={product.imgSrc}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h4 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h4>
              <p className="text-gray-500 mt-2">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Logout Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-medium text-gray-800 mb-4">
              Do you want to logout?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                onClick={() => setShowPopup(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerHome;
