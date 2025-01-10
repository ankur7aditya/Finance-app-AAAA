import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function AdminDocument() {
  const location = useLocation();
  const [applications, setApplications] = useState([]);
  const loanId = location.state.loanId;
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  // console.log(loanId);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_BACKEND_URL}/admin/loans/documents/${loanId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setApplications(data.document);
        console.log(data.document);
      } catch (err) {
        console.error("Error fetching loans:", err.message);
      }
    };

    fetchDocuments();
  }, []);

  const handleApprove = async (status) => {
    try {
      const response = await fetch(
        `${REACT_APP_BACKEND_URL}/admin/loans/approve/${loanId}/${status}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Loan status updated successfully:", data);
    } catch (err) {
      console.error("Error approving loan:", err.message);
    }
  };

  if (!applications) {
    return <div className="text-center py-4">Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Document Details</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4">
          {applications.profilePic ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.profilePic}
                alt="Profile Pic"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">Profile Picture</span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">
                Profile picture not uploaded
              </span>
            </div>
          )}

          {applications.aadharImageFront ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.aadharImageFront}
                alt="Aadhar Front"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">Aadhar Front</span>
              <span className="text-black text-2xl">
                Aadhar Number:{applications.aadharNumber}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">
                Aadhar front image not uploaded
              </span>
            </div>
          )}

          {applications.aadharImageBack ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.aadharImageBack}
                alt="Aadhar Back"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">Aadhar Back</span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">
                Aadhar back image not uploaded
              </span>
            </div>
          )}

          {applications.panImage ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.panImage}
                alt="PAN Card"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">PAN Card</span>
              <span className="text-black text-2xl">
                PAN Number:{applications.panNumber}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">PAN card image not uploaded</span>
            </div>
          )}

          {applications.rcUploadImage ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.rcUploadImage}
                alt="RC"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">RC Image</span>
              <span className="text-black text-2xl">
                RC Number:{applications.rcUploadNumber}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">RC image not uploaded</span>
            </div>
          )}

          {applications.batteryImage ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.batteryImage}
                alt="Battery"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">Battery Image</span>
              <span className="text-black text-2xl">
                Battery Serial Number: {applications.batterySerialNumber}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">Battery image not uploaded</span>
            </div>
          )}

          {applications.customerWithVehicleImage ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.customerWithVehicleImage}
                alt="Customer with Vehicle"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">Customer with Vehicle</span>
              <span className="text-black text-2xl">
                Description: {applications.customerWithVehicleDesc}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">
                Customer with vehicle image not uploaded
              </span>
            </div>
          )}

          {applications.insuranceImage ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.insuranceImage}
                alt="Insurance"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">Insurance</span>
              <span className="text-black text-2xl">
                Insurance Policy Number: {applications.insurancePolicyNumber}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">
                Insurance image not uploaded
              </span>
            </div>
          )}

          {applications.invoiceImage ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.invoiceImage}
                alt="Invoice"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">Invoice</span>
              <span className="text-black text-2xl">
                Invoice Number:{applications.invoiceNumber}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">Invoice image not uploaded</span>
            </div>
          )}

          {applications.passbookImage ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.passbookImage}
                alt="Passbook"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">Passbook</span>
              <span className="text-black text-2xl">
                Account Number:{applications.accountNumber}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">Passbook image not uploaded</span>
            </div>
          )}

          {applications.motorImage ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.motorImage}
                alt="Motor"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">Motor</span>
              <span className="text-black text-2xl">
                Motor Number: {applications.motorNumber}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">Motor image not uploaded</span>
            </div>
          )}

          {applications.vehicleDispatchIDImage ? (
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src={applications.vehicleDispatchIDImage}
                alt="Vehicle Dispatch ID"
                className="w-full h-auto rounded shadow-md object-cover"
              />
              <span className="text-black text-2xl">Vehicle Dispatch ID</span>
              <span className="text-black text-2xl">
                Vehicle Dispatch ID Number:{" "}
                {applications.vehicleDispatchIDNumber}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-200 rounded shadow-md mb-5">
              <span className="text-gray-500">
                Vehicle Dispatch ID image not uploaded
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-6 ">
        {/* TODO: Make this functionality */}
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-5">
          Request KYC
        </button>
        <button
          onClick={()=> handleApprove("approved")}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-5"
        >
          Approve Loan
        </button>
        <button
          onClick={()=> handleApprove("rejected")}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Reject Loan
        </button>
      </div>
    </div>
  );
}

export default AdminDocument;
