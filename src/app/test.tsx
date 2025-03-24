"use client";

import { MainLayout } from "./common/MainLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

// Define TypeScript interfaces for our data
interface Skin {
  imageUrl?: string;
  skinname?: string;
  name?: string;
  wear?: string;
  float?: number;
}

interface Listing {
  skin?: Skin;
  price?: number;
  imageUrl?: string;
  skinname?: string;
  name?: string;
  wear?: string;
  float?: number;
}

const App = () => {
  const [skins, setSkins] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/skins/listing");
        console.log("API response:", res.data); // Log the response to see the structure
        setSkins(res.data);
      } catch (error) {
        console.error("Error fetching skins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkins();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters and search */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search skins..."
              className="pl-10 pr-4 py-2 w-full rounded-md bg-[#303030] border border-[#444] text-gray-200 focus:outline-none focus:border-[#8dd294]"
            />
          </div>
        </div>

        {/* Skin grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square rounded-md bg-[#303030]"></div>
                <div className="h-4 bg-[#303030] rounded mt-2 w-3/4"></div>
                <div className="h-4 bg-[#303030] rounded mt-2 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {skins.length > 0
              ? skins.map((listing, index) => (
                  <SkinCard key={index} listing={listing} />
                ))
              : Array.from({ length: 12 }).map((_, index) => (
                  <PlaceholderSkinCard key={index} />
                ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

const SkinCard = ({ listing }: { listing: Listing }) => {
  const skinData = listing.skin || listing;
  const imageUrl = skinData.imageUrl;
  const skinName = skinData.skinname || skinData.name || "Unknown Skin";
  const wear = skinData.wear || "Factory New";
  const float = skinData.float !== undefined ? skinData.float : 0.5;
  const price = listing.price || 0;

  return (
    <div className="group cursor-pointer transition-all duration-200 hover:translate-y-[-4px]">
      <div className="relative aspect-square rounded-md overflow-hidden bg-[#1e2229] border border-[#303030]">
        {/* Rarity color indicator at the top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#8dd294]"></div>

        {/* Skin image */}
        <div className="flex items-center justify-center h-full p-4">
          {imageUrl ? (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={skinName}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-[#303030] flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        {/* Float value indicator */}
        <div className="absolute bottom-2 left-2 right-2 h-1 bg-[#303030] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#8dd294] to-[#5ea865]"
            style={{ width: `${float * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Skin details */}
      <div className="mt-2 space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm truncate text-gray-200">
            {skinName}
          </h3>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400 truncate">{wear}</p>
          <p className="font-semibold text-sm text-[#8dd294]">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

const PlaceholderSkinCard = () => {
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

export default App;
