import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";

const Collection = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const dealerEmail = localStorage.getItem("email");
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
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

  const columns = React.useMemo(
    () => [
      { Header: "Loan ID", accessor: "_id" },
      { Header: "Name", accessor: "name" },
      { Header: "Phone No", accessor: "phone" },
      { Header: "Partner Code", accessor: "partner" },
      { Header: "Loan Amount", accessor: "loanAmount" },
      { Header: "Term", accessor: "loanTenure" },
      { Header: "EMI", accessor: "emiPaymentDay" },
      { Header: "First EMI Date", accessor: "startingEmiDate" },
      { Header: "EMI Due", accessor: "emiDue" },
      { Header: "Late Fee Due", accessor: "lateFeeDue" },
      { Header: "Extra Paid", accessor: "extraPaid" },
      { Header: "Substatus", accessor: "status" },
      { Header: "April", accessor: "months.april" },
      { Header: "May", accessor: "months.may" },
      { Header: "June", accessor: "months.june" },
      { Header: "July", accessor: "months.july" },
      { Header: "August", accessor: "months.august" },
      { Header: "September", accessor: "months.september" },
      { Header: "October", accessor: "months.october" },
      { Header: "November", accessor: "months.november" },
      { Header: "December", accessor: "months.december" },
      { Header: "January", accessor: "months.january" },
      { Header: "February", accessor: "months.february" },
      { Header: "March", accessor: "months.march" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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

      <table {...getTableProps()} className="table-auto w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border px-4 py-2 bg-gray-200"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border px-4 py-2">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Collection;
