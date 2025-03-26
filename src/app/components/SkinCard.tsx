import Image from "next/image";
import { Listing } from "./types";
import { getRandomDiscount } from "@/lib/get-random-discount";
import { formatCurrency } from "@/lib/format-currency";
import { formatItem } from "@/lib/format-item";

type SkinCardProps = {
  listing: Listing;
};

export const SkinCard = ({ listing }: SkinCardProps) => {
  const { discountPercentage, highPrice } = getRandomDiscount(listing.price);

  return (
    <div>
      <div className="bg-[#2b2b3b] rounded w-full">
        <div className="flex flex-col items-center justify-center ">
          <Image
            src={listing.skin.imageUrl}
            alt=""
            width={187}
            height={128}
            className="px-2 pt-2 pb-1 h-full aspect-[187/128] w-full"
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
            {listing.status}
          </div>
        </div>
      </div>
    </div>
  );
};
