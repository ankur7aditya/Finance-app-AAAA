import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




const Reminder = () => {
  const navigate = useNavigate();
  const [todayData, setTodayData] = useState([]);
  const [yesterdayData, setYesterdayData] = useState([]);
  const [tomorrowData, setTomorrowData] = useState([]);
  const dealerEmail = localStorage.getItem("email");
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
        // console.log("Fetched Data:", data); // Logs API response
        setApplications(data);
      } catch (err) {
        console.error("Error fetching loans by partner:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoansByPartner();
  }, [dealerEmail]);

  // Process applications once they are updated
  useEffect(() => {
    // console.log("Applications State Updated:", applications); // Logs updated applications state

    if (applications.length > 0) {
      const today = new Date();
      const yesterday = new Date(today);
      const tomorrow = new Date(today);

      yesterday.setDate(today.getDate() - 1);
      tomorrow.setDate(today.getDate() + 1);

      const todayDay = today.getDate();
      const yesterdayDay = yesterday.getDate();
      const tomorrowDay = tomorrow.getDate();

      setTodayData(
        applications.filter((loan) => loan.emiPaymentDay === todayDay)
      );
      setYesterdayData(
        applications.filter((loan) => loan.emiPaymentDay === yesterdayDay)
      );
      setTomorrowData(
        applications.filter((loan) => loan.emiPaymentDay === tomorrowDay)
      );
    }
  }, [applications]);

  const monthlyData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Money Collected (in $)",
        data: [500, 750, 600, 900], // Placeholder data, replace with actual values
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-xl font-semibold hover:bg-blue-700 p-2 rounded"
        >
          &#8592; Back
        </button>
        <h1 className="text-2xl font-bold">Reminder Page</h1>
      </div>

      <div className="mt-8">
        {/* Money to be collected today */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Money to be Collected Today
          </h2>
          <ul>
            {todayData.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b"
              >
                <span>{item.name}</span>
                <span className="font-bold text-blue-600">
                  Rs.{(item.loanAmount / item.loanTenure).toFixed(1)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Money not collected yesterday */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Money Not Collected Yesterday
          </h2>
          <ul>
            {yesterdayData.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b"
              >
                <span>{item.name}</span>
                <span className="font-bold text-red-600">
                  Rs.{(item.loanAmount / item.loanTenure).toFixed(1)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Money to be collected tomorrow */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Money to be Collected Tomorrow
          </h2>
          <ul>
            {tomorrowData.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b"
              >
                <span>{item.name}</span>
                <span className="font-bold text-green-600">
                  Rs.{(item.loanAmount / item.loanTenure).toFixed(1)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Monthly Collected Amount */}
        {/* <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Collected Amount
          </h2>
          <div className="h-64">
            <Bar data={monthlyData} options={{ responsive: true }} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Reminder;
