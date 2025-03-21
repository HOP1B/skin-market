"use client";

import { MainLayout } from "./common/MainLayout";
import axios from "axios";
// import { SkinCard } from "./components/SkinCard";
import React, { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import Image from "next/image";

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
        const res = await axios.get("/api/skins/listing");
        setSkins(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSkins();
  }, []);

  // const [query, setQuery] = useState<string>("");
  // const filteredSkins = skins.filter((listing) =>
  //   listing.skin?.skinname?.toLowerCase().includes(query.toLowerCase())
  // );

  return (
    <>
      <MainLayout>
        <div className="grid grid-cols-8 gap-4">
          <div>
            <div className="bg-[#2b2b3b] rounded w-full">
              <div className="flex flex-col items-center justify-center ">
                <Image
                  src={"/400fx300f.png"}
                  alt=""
                  width={187}
                  height={128}
                  className="px-2 pt-2 pb-1 h-full aspect-[187/128] w-full"
                />
              </div>
              <div className="flex flex-col gap-1 pb-3 px-3">
                <div className="flex gap-1 items-center text-[#c4c4d4] text-sm">
                  M9 Bayonet
                </div>
                <div className="flex gap-1 items-center justify-between">
                  <p className="text-[#e5e6e5] text-sm font-bold">Slaughter</p>
                  <p className="text-[#e92a61] text-xs font-bold">-37%</p>
                </div>
                <div className="flex gap-1 items-center justify-between">
                  <p className="text-[#e5e6e5] font-bold">$1000.00</p>
                  <p className="text-[#c4c4d4] text-xs">$2000.00</p>
                </div>
                <div className="text-[#c4c4d4] text-xs">Factory New</div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default App;
