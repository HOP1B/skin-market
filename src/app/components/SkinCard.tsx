"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "@clerk/nextjs";
import { formatCurrency } from "@/lib/format-currency";
import { formatItem } from "@/lib/format-item";
import { getRandomDiscount } from "@/lib/get-random-discount";
import ItemDetails from "./itemDetail";
import type { Listing } from "./types";
import { useWalletStore } from "../hooks/useWalletStore";
import ConfirmationModal from "./ConfirmationModal";

type SkinCardProps = {
  listing: Listing;
  refreshSkinList: () => void; // Receive the function to refresh skin list
};

export const SkinCard = ({ listing, refreshSkinList }: SkinCardProps) => {
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

      // After successful purchase, refresh the skin list
      refreshSkinList(); // Trigger the function to update the list in the parent

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

      <div className="bg-[#151c2e] rounded w-full">
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
            <p className="text-[#ff0000] text-xs font-bold">
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
          <div className="text-[#c4c4d4] text-xs">{listing.status}</div>
        </div>
      </div>
    </div>
  );
};
