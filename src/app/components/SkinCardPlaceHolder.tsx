export const PlaceholderSkinCard = () => {
  return (
    <div className="group cursor-pointer transition-all duration-200">
      <div className="relative aspect-square rounded-md overflow-hidden bg-[#1e2229] border border-[#303030]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#303030]"></div>
        <div className="flex items-center justify-center h-full p-4">
          <div className="w-full h-full bg-[#303030] flex items-center justify-center">
            <span className="text-gray-500">Loading...</span>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 right-2 h-1 bg-[#303030] rounded-full"></div>
      </div>
      <div className="mt-2 space-y-1">
        <div className="h-4 bg-[#303030] rounded w-3/4"></div>
        <div className="flex justify-between">
          <div className="h-3 bg-[#303030] rounded w-1/3"></div>
          <div className="h-3 bg-[#303030] rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};
