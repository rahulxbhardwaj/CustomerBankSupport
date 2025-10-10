import { useState } from "react";

export default function FundTransfer({accountNumber, onTransferSuccess}) {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // 🌀 New state

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader
    setStatus("");
    
    try {
      const senderId = accountNumber; // Replace this later with session
      const res = await fetch("/api/transfer/sendmoney", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId,
          receiverId,
          amount: Number(amount),
        }),
      });

      
      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ ${data.message}`);
        setReceiverId("");
        setAmount("");
        
        // Refresh user data to show updated balance and transactions
        if (onTransferSuccess) {
          onTransferSuccess();
        }
      } else {
        setStatus(`❌ ${data.message}`);
      }

      
    } catch (error) {
      setStatus("⚠️ Something went wrong");
      console.error(error);
    }finally {
      setLoading(false); // stop loader
    }
  };

  return (
    // Outer container for centering and background
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 sm:p-6 lg:p-12">
      {/* The main card/form container */}
      <div className="w-full max-w-sm bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-gray-100">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          💸 Quick Transfer
        </h1>

        <form onSubmit={handleTransfer} className="space-y-6">

          {/* From Account Dropdown */}
          <div>
            <label
              htmlFor="source-account"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              From Account
            </label>
            <div className="relative">
              <select
                id="source-account"
                className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm bg-white text-sm"
                defaultValue="placeholder-source"
              >
                <option value="placeholder-source" disabled>
                  Select Account
                </option>
                <option>Savings - {accountNumber}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* To Beneficiary / Receiver ID */}
          <div>
            <label
              htmlFor="receiver-id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Receiver Account Number:
            </label>
            <input
              type="text"
              id="receiver-id"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              placeholder="Account Number"
              required
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Amount Input */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 font-semibold text-lg">₹</span>
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base font-medium transition duration-150 ease-in-out"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Transfer Funds"
              )}
            </button>
          </div>
        </form>

        {/* Status Message */}
        {status && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
