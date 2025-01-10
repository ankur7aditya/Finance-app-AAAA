import React, { useState } from "react";

const AdminCreateDealer = () => {
  const [name, setName] = useState(""); // Dealer name
  const [email, setEmail] = useState(""); // Dealer email
  const [password, setPassword] = useState(""); // Dealer password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm dealer password
  const [dealerCode, setDealerCode] = useState(""); // Dealer code
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null); // Success state

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleDealerSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const payload = {
      name,
      email,
      password,
      dealerCode,
      userType: "dealer", // Always set as "dealer"
    };

    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        try {
          const errorJSON = JSON.parse(errorData);
          setError(errorJSON.message || "An error occurred");
        } catch {
          setError(errorData || "An error occurred");
        }
      } else {
        setSuccess("Dealer created successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setDealerCode("");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="mb-4 text-xl font-bold text-center">
          CREATE DEALER
        </h1>
 
        {/* Success Message */}
        {success && <div className="mb-4 text-green-500">{success}</div>}
        {/* Error Message */}
        {error && <div className="mb-4 text-red-500">{error}</div>}

        {/* Dealer Signup Form */}
        <form className="space-y-4" onSubmit={handleDealerSignup}>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter dealer name"
              className="w-full px-3 py-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter dealer email"
              className="w-full px-3 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter dealer password"
              className="w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm dealer password"
              className="w-full px-3 py-2 border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dealer Code</label>
            <input
              type="text"
              placeholder="Enter dealer code AAAA25001(AAAA+YY+001)"
              className="w-full px-3 py-2 border rounded-md"
              value={dealerCode}
              onChange={(e) => setDealerCode(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Create Dealer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateDealer;
