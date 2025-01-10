import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const NewApplicationUpload = () => {
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
        <button
          onClick={handleBack}
          className="mr-4 text-xl font-semibold hover:bg-blue-700 p-2 rounded"
        >
          &#8592; Back
        </button>
        <h1 className="text-2xl font-bold">Upload Documents</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() =>
            navigate("/dealer-home/new-application/upload/chassis",{ state: { loanId } })
          }
        >
          Chassis Number
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() => navigate("/dealer-home/new-application/upload/motor",{ state: { loanId } })}
        >
          Motor Number Upload
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() =>
            navigate("/dealer-home/new-application/upload/battery",{ state: { loanId } })
          }
        >
          Battery Photo Upload
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() =>
            navigate("/dealer-home/new-application/upload/passbook",{ state: { loanId } })
          }
        >
          Passbook Upload
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() =>
            navigate("/dealer-home/new-application/upload/customer",{ state: { loanId } })
          }
        >
          Customer Photo
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() =>
            navigate("/dealer-home/new-application/upload/invoice",{ state: { loanId } })
          }
        >
          Vehicle Invoice
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() => navigate("/dealer-home/new-application/upload/nach",{ state: { loanId } })}
        >
          NACH Upload
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() =>
            navigate("/dealer-home/new-application/upload/insurance",{ state: { loanId } })
          }
        >
          Insurance Upload
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() =>
            navigate("/dealer-home/new-application/upload/dispatch",{ state: { loanId } })
          }
        >
          Vehicle Dispatch Upload
        </button>
        <button
          className="bg-blue-500 p-6 text-white rounded-xl text-2xl"
          onClick={() => navigate("/dealer-home/new-application/upload/rc",{ state: { loanId } })}
        >
          RC Upload
        </button>
      </div>
    </div>
  );
};

export default NewApplicationUpload;
