import Image from "next/image";

interface SkinCardProps {
  image: string;
  price: number;
  condition: string;
  floatValue: number;
  name: string; // Шинэ props (Скиний нэр)
}

import ItemDetails from "./itemDetail";

const SkinCard: React.FC<SkinCardProps> = ({
  price,
  condition,
  floatValue,
}) => {
  return (
    <div className="flex flex-wrap  mr-auto ml-[25px] gap-1">
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[13px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none hover:scale-125  transition-transform  duration-300 "
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/bluegem.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/glock.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/sapphire.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/gamma.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/pink.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/violet.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>

      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>

      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>

      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
      <div className="relative  bg-[#2a2c2e]  text-white w-[162px] h-[152px] px-4 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[20px] font-semibold flex  mr-auto">
            ${price}
          </div>
          <ItemDetails />
        </div>

        {/* Зураг */}
        <Image
          src={"/marblefade.png"}
          alt="Skin"
          width={100}
          height={100}
          className="w-full h-[60px] object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex flex-col ml-[4px] mr-auto">
          <span className="text-[#848484] text-[16px] rounded-md">
            {condition}
          </span>
          <span className="text-green-400 text-[16px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkinCard;
