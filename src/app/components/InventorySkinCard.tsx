import Image from "next/image";
import { UserSkin } from "./types";
import { formatItem } from "@/lib/format-item";

type SkinCardProps = {
  userskin: UserSkin;
};

export const InventorySkinCard = ({ userskin }: SkinCardProps) => {
  return (
    <div>
      <div className="bg-[#2b2b3b] rounded w-full">
        <div className="flex flex-col items-center justify-center ">
          <Image
            src={userskin?.skin.imageUrl}
            alt=""
            width={187}
            height={128}
            className="px-2 pt-2 pb-1 h-full aspect-[187/128] w-full"
          />
        </div>
        <div className="flex flex-col gap-1 pb-3 px-3">
          <div className="flex gap-1 items-center text-[#c4c4d4] text-sm">
            {formatItem(userskin?.skin.item)}
          </div>
          <div className="flex gap-1 items-center justify-between">
            <p className="text-[#e5e6e5] text-sm font-bold">
              {userskin?.skin.skinname}
            </p>
          </div>
          <div className="text-[#c4c4d4] text-xs">{userskin.status}</div>
        </div>
      </div>
    </div>
  );
};
