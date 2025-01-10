import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    dependants: "",
    dob: "", // Date field should be initialized appropriately
    duplicateAddress: {
      address: "",
      city: "",
      pinCode: "",
      state: "",
    },
    education: "",
    email: "",
    emiPaymentDay:"", // Default value set as per schema
    emiPayments: [
      {
        paymentDate: "", // Date field
        amountPaid: 0, // Default value set as per schema
      },
    ],
    fatherName: "",
    gender: "",
    householdIncome: "",
    isCurrentAddress: true, // Default value
    loanAmount: "",
    loanPurpose: "",
    loanTenure: "",
    loanType: "",
    maritalStatus: "",
    monthlyIncome: "",
    name: "",
    occupation: "",
    partner: "",
    phone: "",
    pinCode: "",
    remainingAmount: "",
    startingEmiDate: "",
    state: "",
    status: "Pending", // Default value as per schema
    vehicleModel: "",
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [step, setStep] = useState(1); // Track the current step (section) of the form
  const [dealerMessage, setDealerMessage] = useState("");
  const [formError, setFormError] = useState({ panDoc: "" });
  const navigate = useNavigate();
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  //TODO: fetch dealer's code and name from partnercode collection in database
  const dealers = [
    { code: "AAAA24001", name: "M/S ANJALI" },
    { code: "AAAA25002", name: "M/S Ankur" },
    { code: "AAAA25015", name: "Dealer C" },
  ];
  useEffect(() => {
    axios.get(`${REACT_APP_BACKEND_URL}/customers/partner`).then((res) => {
      console.log(res.data);
    });
  },[]);

  const handleCurrentAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(formData.isCurrentAddress === "yes" && {
        duplicateAddress: {
          ...prev.duplicateAddress,
          [name]: value,
        },
      }),
    }));
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      isCurrentAddress: value,
      duplicateAddress:
        value === "yes"
          ? { ...prev }
          : { address: "", pinCode: "", city: "", state: "" },
    }));
  };

  const handlePartnerChange = (e) => {
    const value = e.target.value.trim().toUpperCase();
    setFormData((prev) => ({ ...prev, partner: value }));

    // Automatically check after 9 characters
    if (value.length === 9) {
      const dealer = dealers.find((d) => d.code === value);
      if (dealer) {
        setDealerMessage(`Dealer Found: ${dealer.name}`);
      } else {
        setDealerMessage("No dealer with such code.");
      }
    } else {
      setDealerMessage(""); // Clear message for less than 10 characters
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);

    try {
      const response = await fetch(
        `${REACT_APP_BACKEND_URL}/customers/upload-loan`,
        {
          method: "POST",
          body: JSON.stringify(formData), // Serialize form data
          headers: {
            "Content-Type": "application/json", // Set content type
          },
        }
      );

      const data = await response.json();
      const loanId = data.loan._id;
      // console.log(data.loan._id); // Log the response from the backend
      navigate("/customer-home/upload-doc", { state: { loanId } });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 5)); // Assuming 5 steps in total
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1)); // Prevent going back below step 1
  };

  const handleNestedChange = (key, value) => {
    const keys = key.split(".");
    setFormData((prevData) => {
      let nestedData = { ...prevData };
      let temp = nestedData;
      for (let i = 0; i < keys.length - 1; i++) {
        temp[keys[i]] = { ...temp[keys[i]] };
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
      return nestedData;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Loan Application Form
      </h2>

      {/* Step 1: Personal Information */}
      {step === 1 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Select Loan Type</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Loan Type
            </label>
            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select Status</option>
              <option value="Electric Three Wheeler Loan">
                Electric Three Wheeler Loan
              </option>
              <option value="Electric Two Wheeler Loan">
                Electric Two Wheeler Loan
              </option>
              <option value="EV Ancillary Loan">EV Ancillary Loan</option>
            </select>
          </div>
          <h3 className="text-xl font-bold mb-4">Partner Code</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Partner Code
            </label>
            <input
              type="text"
              name="partner"
              value={formData.partner}
              onChange={handlePartnerChange}
              maxLength={9}
              className="w-full mt-1 p-2 border uppercase border-gray-300 rounded"
            />
          </div>
          <div className="mt-4 text-sm text-gray-700">
            {dealerMessage && <p>{dealerMessage}</p>}
          </div>

          {/* Add other personal info fields here */}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Service Details */}
      {step === 2 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Choose Your Service</h3>
          <div className="mb-4">
            <select
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select Status</option>
              <option value="L3 Passenger">L3 Passenger</option>
              <option value="L2 Passenger">L2 Passenger</option>
              {/* Add other options if other services are available */}
            </select>
          </div>
          <h3 className="text-xl font-bold mb-4">Choose Your Sub Service</h3>

          <div className="mb-4">
            {/* Vertical layout for radio buttons */}
            <div className="flex flex-col space-y-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="option"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={(e) => setSelectedOption(e.target.value)} // Directly updating state
                  className="mr-2"
                />
                Lead Acid - 4 Batteries
              </label>

              {selectedOption === "option1" && (
                <div className="p-4 border border-gray-300 rounded mt-2">
                  <h4>Please note that for the input partner code:</h4>
                  <ul>
                    <li>
                      The permission value for the loan amount is in between Rs.
                      40,000 and Rs. 1,33,000
                    </li>
                    <li>Loan term is between 6 months and 24 months</li>
                  </ul>
                </div>
              )}

              <label className="flex items-center">
                <input
                  type="radio"
                  name="option"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={(e) => setSelectedOption(e.target.value)} // Directly updating state
                  className="mr-2"
                />
                Fixed Lithium Ion 48 Volt
              </label>

              {selectedOption === "option2" && (
                <div className="p-4 border border-gray-300 rounded mt-2">
                  <h4>Please note that for the input partner code:</h4>
                  <ul>
                    <li>
                      The permission value for the loan amount is in between Rs.
                      40,000 and Rs. 1,63,000
                    </li>
                    <li>Loan term is between 6 months and 30 months</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-400 text-white rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Loan Details */}
      {step === 3 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Loan Details</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Loan Amount Requested
            </label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <h3 className="text-xl font-bold mb-4">Loan Term</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Loan Term
            </label>
            <select
              name="loanTenure"
              value={formData.loanTenure}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select Status</option>
              <option value="6">6 months</option>
              <option value="9">9 months</option>
              <option value="12">12 months</option>
              <option value="18">18 months</option>
              <option value="24">24 months</option>
            </select>
          </div>

          <label className="block text-sm font-medium text-gray-700">
            Starting EMI Date
          </label>
          <input
            type="date"
            name="startingEmiDate"
            value={formData.startingEmiDate}
            onChange={(e) => {
              const value = e.target.value;
              handleChange({ target: { name: "startingEmiDate", value } });
            }}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
          <label className="block text-sm font-medium text-gray-700">
            Starting EMI Day
          </label>
          <input
            type="number"
            name="emiPaymentDay"
            min={1}
            max={28}
            value={formData.emiPaymentDay}
            placeholder="Enter the day of the month(1-28)"
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />

          <h3 className="text-xl font-bold mb-4">Loan Purpose</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Loan Purpose
            </label>
            <div className="flex flex-col mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="loanPurpose"
                  value="Self Drive (Commercial Use)"
                  checked={
                    formData.loanPurpose === "Self Drive (Commercial Use)"
                  }
                  onChange={handleChange}
                  className="mr-2"
                />
                Self Drive (Commercial Use)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="loanPurpose"
                  value="Give on Rent (Commercial Use)"
                  checked={
                    formData.loanPurpose === "Give on Rent (Commercial Use)"
                  }
                  onChange={handleChange}
                  className="mr-2"
                />
                Give on Rent (Commercial Use)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="loanPurpose"
                  value="Personal Use"
                  checked={formData.loanPurpose === "Personal Use"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Personal Use
              </label>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">Monthly Income</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Income in Rupees
            </label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <h3 className="text-xl font-bold mb-4">Household Income</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Income in Rupees
            </label>
            <input
              type="number"
              name="householdIncome"
              value={formData.householdIncome}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <h3 className="text-xl font-bold mb-4">Occupation</h3>
          <div className="mb-4">
            <div className="flex flex-col mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="occupation"
                  value="Salaried"
                  checked={formData.occupation === "Salaried"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Salaried
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="occupation"
                  value="Self Employed"
                  checked={formData.occupation === "Self Employed"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Self Employed
              </label>
            </div>
          </div>
          {/* Add other loan details fields here */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-400 text-white rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Basic information */}
      {step === 4 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Basic Personal Information</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={30}
              placeholder="Enter name as per Aadhar"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={30}
              placeholder="Enter email address"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={(e) => {
                  const value = e.target.value;
                  const currentDate = new Date();
                  const selectedDate = new Date(value);
                  const age =
                    currentDate.getFullYear() - selectedDate.getFullYear();
                  const isUnderage =
                    age < 18 ||
                    (age === 18 &&
                      currentDate <
                        new Date(
                          selectedDate.setFullYear(
                            selectedDate.getFullYear() + 18
                          )
                        ));

                  handleChange({ target: { name: "dob", value } });
                  setFormError({
                    dob: isUnderage ? "You must be at least 18 years old." : "",
                  });
                }}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
              {formError.dob && (
                <p className="mt-1 text-sm text-red-600">{formError.dob}</p>
              )}
            </div>

            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              maxLength={90}
              placeholder="Enter address"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              maxLength={30}
              placeholder="Enter city name"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />

            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              maxLength={30}
              placeholder="Enter state name"
              className="w-full mt-1 p-2 border  border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700">
              Pin Code
            </label>
            <input
              type="number"
              name="pinCode"
              value={formData.pinCode}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 6 && value <= 999999) {
                  handleChange(e); // Only update if the input is valid
                }
              }}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Enter 6-digit Pin Code"
            />
            {/* Radio Buttons for Current Address */}
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Is this your current address?
              </span>
              <label className="mr-4">
                <input
                  type="radio"
                  name="isCurrentAddress"
                  value="yes"
                  checked={formData.isCurrentAddress === "yes"}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isCurrentAddress"
                  value="no"
                  checked={formData.isCurrentAddress === "no"}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                No
              </label>
            </div>

            {/* Duplicate Address Section */}
            {formData.isCurrentAddress === "no" && (
              <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
                <h4 className="text-lg font-bold mb-2">Duplicate Address</h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.duplicateAddress.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        duplicateAddress: {
                          ...prev.duplicateAddress,
                          address: e.target.value,
                        },
                      }))
                    }
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Pin Code
                  </label>
                  <input
                    type="number"
                    name="pinCode"
                    value={formData.duplicateAddress.pinCode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        duplicateAddress: {
                          ...prev.duplicateAddress,
                          pinCode: e.target.value,
                        },
                      }))
                    }
                    maxLength={6}
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.duplicateAddress.city}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        duplicateAddress: {
                          ...prev.duplicateAddress,
                          city: e.target.value,
                        },
                      }))
                    }
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.duplicateAddress.state}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        duplicateAddress: {
                          ...prev.duplicateAddress,
                          state: e.target.value,
                        },
                      }))
                    }
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            )}
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>

            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select marital status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Separated">Separated</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>

            <label className="block text-sm font-medium text-gray-700">
              Residence Status
            </label>
            <select
              name="residenceStatus"
              value={formData.residenceStatus}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select residence status</option>
              <option value="Rental">Rental</option>
              <option value="Own">Own</option>
              <option value="Family">Family</option>
            </select>

            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select education</option>
              <option value="Professional degree">Professional degree</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Diploma holder">Diploma holder</option>
              <option value="Twelfth or HSC pass">Twelfth or HSC pass</option>
              <option value="Below twelfth">Below twelfth</option>
              <option value="Tenth">Tenth</option>
              <option value="Below tenth">Below tenth</option>
              <option value="Illiterate">Illiterate</option>
            </select>

            <label className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select occupation</option>
              <option value="Salaried">Salaried</option>
              <option value="Business">Business</option>
              <option value="Professional">Professional</option>
              <option value="Armed forces">Armed forces</option>
              <option value="Housewife/person">Housewife/person</option>
              <option value="Agriculturist">Agriculturist</option>
              <option value="Driver">Driver</option>
              <option value="Police">Police</option>
              <option value="Student">Student</option>
              <option value="Labour">Labour</option>
              <option value="Unemployed">Unemployed</option>
            </select>

            <label className="block text-sm font-medium text-gray-700">
              Father's Name
            </label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              maxLength={30}
              placeholder="Enter father's name"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700">
              Number of dependants
            </label>
            <input
              type="number"
              name="dependants"
              value={formData.dependants}
              onChange={handleChange}
              maxLength={30}
              placeholder="Enter family count"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Add other employment details fields here */}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-400 text-white rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Final Step: Submit */}
      {step === 5 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Review and Submit</h3>

          <div className="mb-4 ">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-2 mr-5 bg-gray-400 text-white rounded"
            >
              Review
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded"
            >
              Submit Application
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default LoanApplicationForm;
