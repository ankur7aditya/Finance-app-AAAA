import React from "react";
import { useNavigate } from "react-router-dom";

const FieldInspection = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // Sample data for the cards
  const inspectionData = [
    { title: "Field inspection to be done", count: 5 },
    { title: "Rejected by admin to be redone", count: 2 },
    { title: "Submitted", count: 8 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button
          onClick={handleBack}
          className="mr-4 text-xl font-semibold hover:bg-blue-700 p-2 rounded"
        >
          &#8592; Back
        </button>
        <h1 className="text-2xl font-bold">Field Inspection</h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center mt-8 space-y-4 sm:space-x-4 sm:space-y-0 px-4">
        {inspectionData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center w-full sm:w-64"
          >
            <div className="text-lg font-semibold">{item.title}</div>
            <div className="text-2xl font-bold text-blue-600">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldInspection;
