import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLoans() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/admin/loans`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching loans:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);
  return (
    <div className="p-8">
      <div className="bg-orange-600 text-white p-4 mb-5 flex items-center">
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
                  Partner Code
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {applications
                .slice() // Creates a shallow copy of the array to avoid mutating the original
                .reverse() // Reverses the copy
                .map((app) => (
                  <tr key={app._id} className="border-b">
                    <td className="px-4 py-2">{app.name}</td>
                    <td className="px-4 py-2">{app.phone}</td>
                    <td className="px-4 py-2">{app.email}</td>
                    <td className="px-4 py-2">{app.loanAmount}</td>
                    <td className="px-4 py-2">{app.partner}</td>
                    <td className="px-4 py-2">{app.status || "Pending"}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => {
                          const loanId = app._id;
                          navigate(`/admin-home/new-application/document`, {
                            state: { loanId },
                          });
                        }}
                      >
                        View Document
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
}

export default AdminLoans;
