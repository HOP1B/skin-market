"use client";

import { MainLayout } from "./common/MainLayout";
import axios from "axios";
import { SkinCard } from "./components/SkinCard";
import React, { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { Search } from "lucide-react";
import { Prisma } from "@prisma/client";

const App = () => {
  const [skins, setSkins] = useState<
    Prisma.SkinListingGetPayload<{
      include: {
        skin: true;
      };
    }>[]
  >([]);

  console.log(skins);

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        const res = await axios.get("/api/skin/listing");
        setSkins(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSkins();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="flex justify-between pr-4 pt-4">
          <div className="pl-5">
            <form className="relative w-[253px] h-12 mb-4">
              <input
                type="text"
                placeholder="Search market"
                className="w-full h-full bg-[#2a2c2e] rounded-md pl-12 placeholder-white text-white"
              />
              <div className="w-12 h-full flex items-center justify-center absolute top-0 left-0 bg-[#2a2c2e]">
                <Search color="white" size={24} />
              </div>
            </form>
            <div className="grid grid-cols-11 gap-1 bg-gray-800">
              {skins.map((listing) => (
                <SkinCard
                  key={listing.id}
                  image={listing.skin.imageUrl}
                  price={listing.price}
                  condition={listing.status}
                  name={listing.skin.skinname}
                />
              ))}
            </div>
          </div>
          <Filter />
        </div>
      </MainLayout>
    </>
  );
};

export default App;
