import { formatStatus } from "@/lib/format-status";
import ItemDetails from "./itemDetail";
import { Status } from "@prisma/client";
import Image from "next/image";

type SkinCardProps = {
  image: string;
  price: number;
  condition: Status;
  name: string;
};

export const SkinCard = ({ image, price, condition, name }: SkinCardProps) => {
  return (
    <div className="flex flex-wrap ml-[7px] gap-1">
      <div className="relative bg-[#2a2c2e] text-white w-[162px] h-[152px] px-4 rounded-lg">
        <div className="flex gap-5">
          <div className="text-green-400 text-[20px] font-semibold flex mr-auto">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </div>
          {/* ✅ Pass props to ItemDetails */}
          <ItemDetails image={image} price={price} name={name} />
        </div>

        <Image width={100} height={100} src={image} alt="" className="w-30" />

        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {formatStatus(condition)}
          </span>
        </div>
      </div>
    </div>
  );
};
