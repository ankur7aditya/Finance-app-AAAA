import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoanDocumentUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loanId = location.state.loanId;
  console.log(loanId);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-blue-600 text-white p-4 mb-5 flex items-center">
        <h1 className="text-2xl font-bold">Upload Documents</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() =>
            navigate("/customer-home/upload/pan", { state: { loanId } })
          }
        >
          PAN Card
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() =>
            navigate("/customer-home/upload/aadhar-front", {
              state: { loanId },
            })
          }
        >
          Aadhar Card Front
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() =>
            navigate("/customer-home/upload/aadhar-back", { state: { loanId } })
          }
        >
          Aadhar Card Back
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() =>
            navigate("/customer-home/upload/profile-pic", { state: { loanId } })
          }
        >
          Profile Picture
        </button>
      </div>
      <button
        onClick={() => {
          navigate("/customer-home", { state: { loanId } });
          alert("Loan Application Completed");
        }}
        className="bg-green-600 text-white text-2xl p-4 mb-5 flex items-center rounded-lg mt-5 w-full justify-center"
      >
        Loan Application Completed
      </button>
    </div>
  );
};

export default LoanDocumentUpload;
// onChange={(e) => {
//     const value = e.target.value.toUpperCase(); // Ensure uppercase input
//     if (value.length <= 10) {
//       handleNestedChange("pan.panNumber", value); // Update the nested value
//       if (value.length === 10) {
//         const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN format
//         setFormError((prevError) => ({
//           ...prevError,
//           panDoc: panRegex.test(value)
//             ? ""
//             : "Invalid PAN Number format.",
//         }));
//       } else {
//         setFormError((prevError) => ({
//           ...prevError,
//           panDoc: "",
//         }));
//       }
//     }
//   }}
