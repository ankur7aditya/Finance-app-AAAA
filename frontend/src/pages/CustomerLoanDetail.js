import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CustomerLoanDetail = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [emiDetails, setEmiDetails] = useState({
    paymentDate: new Date().toISOString().split("T")[0], // Default to today's date
    amountPaid: "",
  });
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const dealerEmail = localStorage.getItem("email");
  const navigate = useNavigate();

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

    if (dealerEmail) {
      fetchLoansByPartner();
    } else {
      console.error("Dealer email not found in localStorage.");
      setLoading(false);
    }
  }, [dealerEmail]);

  const handlePayClick = (loan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmiDetails({
      paymentDate: new Date().toISOString().split("T")[0], // Reset date to today
      amountPaid: "",
    });
  };

  const handleSubmitPayment = async () => {
    try {
      // Add logic here to update the loan's emiPayments field in the backend
      const response = await fetch(
        `${REACT_APP_BACKEND_URL}/dealer/loan/${selectedLoan._id}/pay`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emiDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating payment");
      }

      // Update the loan list after payment
      const updatedLoan = await response.json();

      setApplications((prevApplications) =>
        prevApplications.map((loan) =>
          loan._id === selectedLoan._id
            ? {
                ...loan,
                emiPayments: updatedLoan.emiPayments,
                remainingAmount: updatedLoan.remainingAmount,
              }
            : loan
        )
      );

      handleCloseModal();
    } catch (err) {
      console.error("Error submitting payment:", err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (applications.length === 0) {
    return (
      <div>
        <p>No loan applications found for the current dealer.</p>
        <button
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-blue-600 text-white p-4 mb-5 flex items-center">
        <button
          onClick={handleBack}
          className="mr-4 text-xl font-semibold hover:bg-blue-700 p-2 rounded"
        >
          &#8592; Back
        </button>
        <h1 className="text-2xl font-bold">Customer Loan Applications</h1>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-200">Application ID</th>
            <th className="border px-4 py-2 bg-gray-200">Customer Name</th>
            <th className="border px-4 py-2 bg-gray-200">Loan Amount</th>
            <th className="border px-4 py-2 bg-gray-200">Loan Left</th>
            <th className="border px-4 py-2 bg-gray-200">Tenure</th>
            <th className="border px-4 py-2 bg-gray-200">First Payment</th>
            <th className="border px-4 py-2 bg-gray-200">Status</th>
            <th className="border px-4 py-2 bg-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id} className="border-b">
              <td className="border px-4 py-2">{application._id}</td>
              <td className="border px-4 py-2">{application.name}</td>
              <td className="border px-4 py-2">{application.loanAmount}</td>
              <td className="border px-4 py-2">
                {application.remainingAmount !== undefined
                  ? application.remainingAmount
                  : application.loanAmount -
                    (application.emiPayments?.reduce(
                      (total, payment) => total + payment.amountPaid,
                      0
                    ) || 0)}
              </td>

              <td className="border px-4 py-2">{application.loanTenure}</td>
              <td className="border px-4 py-2">
                {application.startingEmiDate}
              </td>
              <td className="border px-4 py-2">{application.status}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handlePayClick(application)}
                >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for EMI Payment */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 sm:w-1/3">
            <h2 className="text-xl font-bold mb-4">Make Payment</h2>
            <div>
              <label className="block mb-2">Payment Date:</label>
              <input
                type="date"
                className="border px-4 py-2 mb-4 w-full"
                value={emiDetails.paymentDate}
                onChange={(e) =>
                  setEmiDetails({ ...emiDetails, paymentDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2">Amount Paid:</label>
              <input
                type="number"
                className="border px-4 py-2 mb-4 w-full"
                value={emiDetails.amountPaid}
                onChange={(e) =>
                  setEmiDetails({ ...emiDetails, amountPaid: e.target.value })
                }
              />
            </div>

            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleSubmitPayment}
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerLoanDetail;
