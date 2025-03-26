import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "@clerk/nextjs";
import { formatCurrency } from "@/lib/format-currency";
import { formatItem } from "@/lib/format-item";
import { formatStatus } from "@/lib/format-status";
import { getRandomDiscount } from "@/lib/get-random-discount";
import ItemDetails from "./itemDetail";
import { Listing } from "./types";

type SkinCardProps = {
  listing: Listing;
};

export const SkinCard = ({ listing }: SkinCardProps) => {
  const { session } = useSession();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { discountPercentage, highPrice } = getRandomDiscount(listing.price);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setConfirmOpen(false); // ItemDetails хаагдах үед ConfirmationModal ч хаагдана
  };

  const handleOpenConfirm = () => {
    setConfirmOpen(true);
    setDialogOpen(false); // ItemDetails-ийг хааж, зөвхөн ConfirmationModal үлдээнэ
  };

  const handleCloseConfirm = () => setConfirmOpen(false);

  const handleBuy = async () => {
    try {
      await axios.post("/api/skin/listing/buy", {
        listingId: listing.id,
        userId: session?.user.id,
      });
      console.log("Purchase successful");
      handleCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* ItemDetails Modal */}
      {dialogOpen && (
        <ItemDetails
          onBuy={handleOpenConfirm} // Шийдэх modal руу шилжинэ
          image={listing.skin.imageUrl}
          price={listing.price}
          name={listing.skin.skinname}
          onClose={handleCloseDialog}
        />
      )}

      {/* ConfirmationModal - хамгийн урд харагдана */}
      {confirmOpen && (
        <ConfirmationModal
          onConfirm={handleBuy}
          onCancel={handleCloseConfirm}
        />
      )}

      <div className="bg-[#2b2b3b] rounded w-full">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={listing.skin.imageUrl}
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

// Шийдэх modal
const ConfirmationModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2b2b3b] p-6 rounded-xl shadow-lg text-center w-80">
        <p className="text-[#e5e6e5] text-lg font-bold mb-4">Are you sure?</p>
        <div className="flex justify-center gap-6">
          <button
            onClick={onConfirm}
            className="bg-[#e92a61] text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md 
                      hover:bg-[#c81e50] transition duration-300 transform hover:scale-105"
          >
            Yes, Buy
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md 
                      hover:bg-gray-500 transition duration-300 transform hover:scale-105"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

