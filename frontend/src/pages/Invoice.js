import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Invoice = (id) => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState("");
  const [vehicleUsageType, setVehicleUsageType] = useState("");
  const [rtoCode, setRtoCode] = useState("");
  const [exShowroomPrice, setExShowroomPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rtoCharge, setRtoCharge] = useState("");
  const [otherCharge, setOtherCharge] = useState("");
  const [onRoadPrice, setOnRoadPrice] = useState("");
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();
  const location = useLocation();
  const loanID = location.state.loanId;
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !image ||
      !description ||
      !invoiceNumber ||
      !manufacturingYear ||
      !vehicleUsageType ||
      !rtoCode ||
      !exShowroomPrice ||
      !downPayment ||
      !rtoCharge ||
      !otherCharge ||
      !onRoadPrice
    ) {
      setMessage("Please provide all details.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("invoiceNumber", invoiceNumber);
    formData.append("manufacturingYear", manufacturingYear);
    formData.append("vehicleUsageType", vehicleUsageType);
    formData.append("rtoCode", rtoCode);
    formData.append("exShowroomPrice", exShowroomPrice);
    formData.append("downPayment", downPayment);
    formData.append("rtoCharge", rtoCharge);
    formData.append("otherCharge", otherCharge);
    formData.append("onRoadPrice", onRoadPrice);

    try {
      const response = await axios.post(
        `${REACT_APP_BACKEND_URL}/upload/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Invoice details uploaded successfully!");
      // console.log(response.data);
      const URL = response.data;
      // console.log(URL);
      if (!URL) {
        setMessage("Failed to upload. Please try again.");
        return;
      }
      // Prepare document data
      const documentData = {
        loanId: loanID, // Replace with actual loan ID
        url: URL,
        invoiceNumber,
        manufacturingYear,
        vehicleUsageType,
        rtoCode ,
        exShowroomPrice,
        downPayment, 
        rtoCharge,
        otherCharge,
        onRoadPrice,
        description, 
      };

      // Post document data to the collection
      const documentResponse = await axios.post(
        `${REACT_APP_BACKEND_URL}/dealer/documents/invoice`,
        documentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Document added successfully:", documentResponse.data);

      navigate(-1);
    } catch (error) {
      setMessage("Failed to upload post. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Upload Invoice
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-700"
            >
              Invoice Upload:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Invoice Number:
            </label>
            <textarea
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="Enter the description about the image"
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Manufacturing Year:
            </label>
            <textarea
              id="manufacturingYear"
              value={manufacturingYear}
              onChange={(e) => setManufacturingYear(e.target.value)}
              placeholder="Enter the description about the image"
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Vehicle Usage Type:
            </label>
            <textarea
              id="vehicleUsageType"
              value={vehicleUsageType}
              onChange={(e) => setVehicleUsageType(e.target.value)}
              placeholder="Enter the description about the image"
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              RTO Charge:
            </label>
            <textarea
              id="rtoCharge"
              value={rtoCharge}
              onChange={(e) => setRtoCharge(e.target.value)}
              placeholder="Enter the description about the image"
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              RTO Code:
            </label>
            <textarea
              id="rtoCode"
              value={rtoCode}
              onChange={(e) => setRtoCode(e.target.value)}
              placeholder="Enter the description about the image"
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Ex Showroom Price:
            </label>
            <textarea
              id="exShowroomPrice"
              value={exShowroomPrice}
              onChange={(e) => setExShowroomPrice(e.target.value)}
              placeholder="Enter the description about the image"
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Down Payment:
            </label>
            <textarea
              id="downPayment"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="Enter the description about the image"
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Other Charges:
            </label>
            <textarea
              id="otherCharge"
              value={otherCharge}
              onChange={(e) => setOtherCharge(e.target.value)}
              placeholder="Enter the description about the image"
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              On Road Price:
            </label>
            <textarea
              id="onRoadPrice"
              value={onRoadPrice}
              onChange={(e) => setOnRoadPrice(e.target.value)}
              placeholder="Enter the description about the image"
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the description about the image"
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Submit
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-lg font-medium ${
              message.includes("Failed") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Invoice;
