import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const cards = [
    {
      id: 1,
      image: "../assests/reminder.jpg",
      text: "Loan Updates",
      path: "/admin-home/loans",
    },
    {
      id: 2,
      image: "../assests/profile.jpeg",
      text: "Dealer Profile",
      path: "/admin-home/dealer-profile",
    },
    {
      id: 3,
      image: "../assests/training.png",
      text: "Create Dealer",
      path: "/admin-home/create-dealer",
    },
    // { id: 4, image: "../assests/newApplication.jpeg", text: "New Application", path: "/dealer-home/new-application" },
    // { id: 5, image: "../assests/loanDetails.jpg", text: "Customer Loan Detail", path: "/dealer-home/customer-loan-detail" },
    // { id: 6, image: "../assests/Collection.jpeg", text: "Collection", path: "/dealer-home/collection" },
    // { id: 7, image: "../assests/enquiry.jpg", text: "Enquiry", path: "/dealer-home/enquiry" },
    // { id: 8, image: "../assests/fieldInspection.jpg", text: "Field Inspection", path: "/dealer-home/field-inspection" },
  ];

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    if (!userType) {
      navigate("/"); // Redirect to login if userType is not set
    }
  }, [userType]);
  const handleLogout = () => {
    setShowPopup(false);
    localStorage.clear(); // Clear the local storage
    navigate("/"); // Redirect to the login page
  };

  const handleCardClick = (path) => {
    navigate(path); // Redirect to the path specified in the card
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center px-4 py-2 bg-blue-600 text-white">
        <h1 className="text-xl font-semibold">AAAA-Dealer</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={() => setShowPopup(true)}
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-center justify-center h-[calc(100vh/3)] bg-white border rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition"
            onClick={() => handleCardClick(card.path)} // Navigate on click
          >
            <img
              src={card.image}
              alt={card.text}
              className="w-20 h-20 mb-2 object-cover"
            />
            <p className="text-lg font-medium text-gray-700">{card.text}</p>
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
}

export default AdminHome;
