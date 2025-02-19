import Image from "next/image";
import React from "react";

interface SkinCardProps {
  image: string;
  price: number;
  condition: string;
  floatValue: number;
  name: string; // Шинэ props (Скиний нэр)
}

const SkinCard: React.FC<SkinCardProps> = ({
  price,
  condition,
  floatValue,
  name,
}) => {
  return (
    <div className="relative w-64 bg-gray-900 text-white p-4 rounded-lg">
      {/* Үнэ */}
      <div className="text-green-400 text-lg font-semibold flex items-center">
        ${price}
      </div>

      {/* Зураг */}
      <Image
        src={"/sapphire.png"}
        alt="Skin"
        width={100}
        height={100}
        className="w-full h-24 object-contain my-2 border-none shadow-none"
      />

      {/* Condition болон Float */}
      <div className="flex items-center gap-2">
        <span className="bg-teal-500 text-black px-2 py-1 text-xs rounded-md">
          {condition}
        </span>
        <span className="text-[#fff] text-xs transition-all duration-300 hover:blur-sm">
          {floatValue}
        </span>
      </div>

      {/* Скиний нэр (шинэ нэмэлт) */}
      <div className="text-sm text-[#fff] mt-1 font-medium">{name}</div>
    </div>
  );
};

export default SkinCard;
