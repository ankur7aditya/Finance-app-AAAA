import React from "react";
import { useNavigate } from "react-router-dom";

const Enquiry = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button
          onClick={handleBack}
          className="mr-4 text-xl font-semibold hover:bg-blue-700 p-2 rounded"
        >
          &#8592; Back
        </button>
        <h1 className="text-2xl font-bold">Enquiry</h1>
      </div>

      <div className="flex justify-center mt-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-xl font-semibold mb-4">Customer Enquiries</h2>
          <p className="text-gray-600">
            Here you can view and respond to customer enquiries.
          </p>

          {/* Add enquiry details as needed */}
          <ul className="mt-6">
            <li className="mb-2">Enquiry 1</li>
            <li className="mb-2">Enquiry 2</li>
            <li className="mb-2">Enquiry 3</li>
            {/* Add more enquiries */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
