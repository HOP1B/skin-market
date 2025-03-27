"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "@clerk/nextjs";
import { formatCurrency } from "@/lib/format-currency";
import { formatItem } from "@/lib/format-item";
import { formatStatus } from "@/lib/format-status";
import { getRandomDiscount } from "@/lib/get-random-discount";
import ItemDetails from "./itemDetail";
import type { Listing } from "./types";
import { useWalletStore } from "../hooks/useWalletStore";

type SkinCardProps = {
  listing: Listing;
};

export const SkinCard = ({ listing }: SkinCardProps) => {
  const { session } = useSession();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Use the wallet hook to access and update balance
  const { balance, minus } = useWalletStore();

  const { discountPercentage, highPrice } = getRandomDiscount(listing.price);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setConfirmOpen(false);
    setPurchaseError("");
  };

  const handleOpenConfirm = () => {
    setConfirmOpen(true);
    setDialogOpen(false);
    setPurchaseError("");
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
    setPurchaseError("");
  };

  const handleBuy = async () => {
    if (!session?.user.id) {
      setPurchaseError("You must be logged in to make a purchase");
      return;
    }

    // Check if user has enough balance
    if (balance < listing.price) {
      setPurchaseError(
        "Insufficient funds. Please add more funds to your wallet."
      );
      return;
    }

    setIsPurchasing(true);
    setPurchaseError("");

    try {
      const response = await axios.post("/api/skin/listing/buy", {
        listingId: listing.id,
        userId: session.user.id,
      });

      console.log("Purchase successful", response.data);

      minus(listing.price);

      handleCloseConfirm();
    } catch (error) {
      console.error("Purchase error:", error);
      if (axios.isAxiosError(error) && error.response) {
        setPurchaseError(
          error.response.data.message || "Failed to complete purchase"
        );
      } else {
        setPurchaseError("An unexpected error occurred");
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div>
      {/* ItemDetails Modal */}
      {dialogOpen && (
        <ItemDetails
          onBuy={handleOpenConfirm}
          image={listing.skin.imageUrl}
          price={listing.price}
          name={listing.skin.skinname}
          onClose={handleCloseDialog}
        />
      )}

      {/* ConfirmationModal - shown on top */}
      {confirmOpen && (
        <ConfirmationModal
          onConfirm={handleBuy}
          onCancel={handleCloseConfirm}
          isLoading={isPurchasing}
          error={purchaseError}
          price={listing.price}
          balance={balance}
        />
      )}

      <div className="bg-[#2b2b3b] rounded w-full">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={listing.skin.imageUrl || "/placeholder.svg"}
            alt=""
            width={187}
            height={128}
            onClick={handleOpenDialog}
            className="px-2 pt-2 pb-1 h-full aspect-[187/128] w-full cursor-pointer hover:scale-105 duration-300"
          />
        </div>
        <div className="flex flex-col gap-1 pb-3 px-3">
          <div className="flex gap-1 items-center text-[#c4c4d4] text-sm">
            {formatItem(listing.skin.item)}
          </div>
          <div className="flex gap-1 items-center justify-between">
            <p className="text-[#e5e6e5] text-sm font-bold">
              {listing.skin.skinname}
            </p>
            <p className="text-[#e92a61] text-xs font-bold">
              -{discountPercentage}%
            </p>
          </div>
          <div className="flex gap-1 items-center justify-between">
            <p className="text-[#e5e6e5] font-bold">
              {formatCurrency(listing.price)}
            </p>
            <p className="text-[#c4c4d4] text-xs">
              {formatCurrency(highPrice)}
            </p>
          </div>
          <div className="text-[#c4c4d4] text-xs">
            {formatStatus(listing.status)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Confirmation modal with improved error handling and balance display
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
