
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
  name,
}) => {

  return (
    <div className="flex flex-wrap mr-auto  gap-1 w-[1300px]">
      <div className="relative  bg-[#2a2c2e]  text-white w-[107px] px-2 rounded-lg">
        {/* Үнэ */}
        <div className="flex justify-between">
          <div className="text-green-400 text-[10px] font-semibold flex  mr-auto">
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
          className="w-full h-10 object-contain my-2 border-none shadow-none"
        />
        {/* Condition болон Float */}
        <div className="flex items-center ml-[4px] mr-auto gap-2">
          <span className="text-[#848484] text-[11px] rounded-md">
            {condition}
          </span>
          <span className="text-[#fff] text-[11px] transition-all duration-300 hover:blur-sm">
            {floatValue}
          </span>
        </div>

        {/* Скиний нэр */}
        <div className="text-[8px] ml-[4px] text-green-400 mt-1 font-small mb-[6px]">
          {name}
        </div>
      </div>
    
    </div>
  );
};

export default SkinCard;
