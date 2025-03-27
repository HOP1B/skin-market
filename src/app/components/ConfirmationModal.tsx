// ConfirmationModal.tsx

import React from "react";
import { formatCurrency } from "@/lib/format-currency"; // adjust this import based on your setup

const ConfirmationModal = ({
  onConfirm,
  onCancel,
  isLoading,
  error,
  price,
  balance,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string;
  price: number;
  balance: number;
}) => {
  const insufficientFunds = balance < price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2b2b3b] p-6 rounded-xl shadow-lg text-center w-80">
        <p className="text-[#e5e6e5] text-lg font-bold mb-4">
          Confirm Purchase
        </p>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#c4c4d4]">Price:</span>
            <span className="text-[#e5e6e5] font-bold">
              {formatCurrency(price)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#c4c4d4]">Your balance:</span>
            <span
              className={`font-bold ${
                insufficientFunds ? "text-[#e92a61]" : "text-[#4fd25c]"
              }`}
            >
              {formatCurrency(balance)}
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-[#3a2a2e] border border-[#e92a61] text-[#e92a61] p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-center gap-6">
          <button
            onClick={onConfirm}
            disabled={isLoading || insufficientFunds}
            className={`${
              insufficientFunds
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#e92a61] hover:bg-[#c81e50] transform hover:scale-105"
            } text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md 
            transition duration-300 disabled:opacity-70`}
          >
            {isLoading ? "Processing..." : "Yes, Buy"}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md 
                      hover:bg-gray-500 transition duration-300 transform hover:scale-105
                      disabled:opacity-70 disabled:transform-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
