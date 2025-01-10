import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";

const Collection = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const dealerEmail = localStorage.getItem("email");
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  // clg

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_BACKEND_URL}/dealer/loan?email=${encodeURIComponent(
            dealerEmail
          )}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result); // Update data with API response
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [dealerEmail]); // Fetch data only once when the component mounts

  const handleExportExcel = () => {
    const flattenedData = data.map(({ months, ...rest }) => ({
      ...rest,
      ...months,
    }));

    const ws = XLSX.utils.json_to_sheet(flattenedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Collection Details");
    XLSX.writeFile(wb, "collection_details.xlsx");
  };

  return (
    <div className="p-6">
      <div className="bg-blue-600 text-white p-4 mb-5 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-xl font-semibold hover:bg-blue-700 p-2 rounded"
        >
          &#8592; Back
        </button>
        <h1 className="text-2xl font-bold">Collection Details</h1>
      </div>

      <div className="mb-4">
        <button
          onClick={handleExportExcel}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Export to Excel
        </button>
        <CSVLink
          data={data}
          filename="collection_details.csv"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export to CSV
        </CSVLink>
      </div>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-200">Loan ID</th>
            <th className="border px-4 py-2 bg-gray-200">Name</th>
            <th className="border px-4 py-2 bg-gray-200">Phone No</th>
            <th className="border px-4 py-2 bg-gray-200">Partner Code</th>
            <th className="border px-4 py-2 bg-gray-200">Loan Amount</th>
            <th className="border px-4 py-2 bg-gray-200">Term</th>
            <th className="border px-4 py-2 bg-gray-200">EMI</th>
            <th className="border px-4 py-2 bg-gray-200">First EMI Date</th>
            <th className="border px-4 py-2 bg-gray-200">EMI Due</th>
            <th className="border px-4 py-2 bg-gray-200">Late Fee Due</th>
            <th className="border px-4 py-2 bg-gray-200">Extra Paid</th>
            <th className="border px-4 py-2 bg-gray-200">Substatus</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b">
              <td className="border px-4 py-2">{row._id}</td>
              <td className="border px-4 py-2">{row.name}</td>
              <td className="border px-4 py-2">{row.phone}</td>
              <td className="border px-4 py-2">{row.partner}</td>
              <td className="border px-4 py-2">{row.loanAmount}</td>
              <td className="border px-4 py-2">{row.loanTenure}</td>
              <td className="border px-4 py-2">{row.emiPaymentDay}</td>
              <td className="border px-4 py-2">{row.startingEmiDate}</td>
              <td className="border px-4 py-2">{row.emiDue}</td>
              <td className="border px-4 py-2">{row.lateFeeDue}</td>

              <td className="border px-4 py-2">{row.extraPaid}</td>
              <td className="border px-4 py-2">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Collection;
