import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userType, setUserType] = useState("customer"); // Tracks selected user type
  const [isSignup, setIsSignup] = useState(false); // Tracks if the user is on the signup form
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const [error, setError] = useState(null); // Error state
  const [name, setName] = useState(""); // Track user name
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const setLocalStorage = async (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const endpoint = isSignup ? "signup" : "login";
    const payload = { name, email, password, userType };

    try {
      const response = await fetch(
        `${REACT_APP_BACKEND_URL}/auth/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        try {
          const errorJSON = JSON.parse(errorData);
          setError(errorJSON.message || "An error occurred");
        } catch {
          setError(errorData || "An error occurred");
        }
      } else {
        const data = await response.json();
        await setLocalStorage("email", email);
        await setLocalStorage("userType", userType);
        if (userType === "customer") {
          window.location.href = "/customer-home";
        } else if (userType === "dealer") {
          window.location.href = "/dealer-home";
        } else if (userType === "admin") {
          window.location.href = "/admin-home";
        }
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        {/* User Type Selection */}
        <div className="flex justify-around mb-4">
          <button
            className={`px-4 py-2 font-semibold ${
              userType === "customer" ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded-lg`}
            onClick={() => setUserType("customer")}
          >
            Customer
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              userType === "dealer" ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded-lg`}
            onClick={() => setUserType("dealer")}
            // disabled // Disabling dealer signup/login
          >
            Dealer
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              userType === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded-lg`}
            onClick={() => setUserType("admin")}
          >
            Admin
          </button>
        </div>

        {/* Login/Signup Toggle */}
        <div className="flex justify-center mb-4">
          {userType === "customer" && (
            <>
              <button
                className={`px-3 py-1 ${
                  !isSignup ? "font-bold underline" : ""
                }`}
                onClick={() => setIsSignup(false)}
              >
                Login
              </button>
              <span className="mx-2">|</span>
              <button
                className={`px-3 py-1 ${isSignup ? "font-bold underline" : ""}`}
                onClick={() => setIsSignup(true)}
              >
                Signup
              </button>
            </>
          )}
        </div>

        {/* Error Message */}
        {error && <div className="mb-4 text-red-500">{error}</div>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && userType === "customer" && (
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignup && userType === "customer" && (
            <div>
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {isSignup && userType === "customer" ? "Sign Up" : "Log In"} as{" "}
            {userType}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
