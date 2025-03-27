"use client";

import { MainLayout } from "./common/MainLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { PlaceholderSkinCard } from "./components/SkinCardPlaceHolder";
import { SkinCard } from "./components/SkinCard";
import { Listing } from "./components/types";

const App = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to refresh the skin list after a purchase
  const refreshSkinList = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/skins/listing");
      console.log("API response after purchase:", res.data);
      setListings(res.data);
    } catch (error) {
      console.error("Error fetching skins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/skins/listing");
        console.log("API response:", res.data);
        setListings(res.data);
      } catch (error) {
        console.error("Error fetching skins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkins();
  }, []);

  return (
    <>
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
              {listings.length > 0
                ? listings.map((listing, index) => (
                    <SkinCard
                      listing={listing}
                      key={index}
                      refreshSkinList={refreshSkinList}
                    />
                  ))
                : Array.from({ length: 12 }).map((_, index) => (
                    <PlaceholderSkinCard key={index} />
                  ))}
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default App;
