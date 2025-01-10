import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const dealerEmail = localStorage.getItem("email");
  const navigate = useNavigate();
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const handleBack = () => {
    navigate(-1);
  };
  // Fetch loans by partner code
  useEffect(() => {
    const fetchLoansByPartner = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_BACKEND_URL}/dealer/loan?email=${encodeURIComponent(
            dealerEmail
          )}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching loans by partner:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoansByPartner();
  }, [dealerEmail]);

  return (
    <div className="p-8">
      <div className="bg-blue-600 text-white p-4 mb-5 flex items-center">
        <button
          onClick={handleBack}
          className="mr-4 text-xl font-semibold hover:bg-blue-700 p-2 rounded"
        >
          &#8592; Back
        </button>
        <h1 className="text-2xl font-bold">New Applications</h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Customer Name
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Phone No
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Email ID
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Loan Amount
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Document Upload
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-b">
                  <td className="px-4 py-2">{app.name}</td>
                  <td className="px-4 py-2">{app.phone}</td>
                  <td className="px-4 py-2">{app.email}</td>
                  <td className="px-4 py-2">{app.loanAmount}</td>
                  <td className="px-4 py-2">{app.status || "Pending"}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => {
                        const loanId  = app._id;
                        // console.log(loanId, app._id);
                        navigate(`/dealer-home/new-application/upload`, {
                          state: { loanId },
                        });
                      }}
                    >
                      Upload
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewApplication;
