import React, { useState } from "react";

const Subscribe = () => {
  const [loading, setLoading] = useState(false);
  const backendUrl = "http://localhost:5000/api/paypal";

  const handlePayment = async () => {
    setLoading(true);
    try {
      window.location.href = `${backendUrl}/pay`;
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Statly subscription</h2>
      <p className="mb-6">Statly description</p>
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full flex items-center justify-center px-4 py-2 rounded-xl ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold transition duration-200`}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        ) : null}
        {loading ? "Processing..." : "Subscribe"}
      </button>
    </>
  );
};

export default Subscribe;
