"use client";

import axios from "axios";
// import { SkinCard } from "./components/SkinCard";
import React, { useEffect, useState } from "react";
import { MainLayout } from "../common/MainLayout";
import { InventorySkinCard } from "../components/InventorySkinCard";
import { UserSkin } from "../components/types";
import { useSession } from "@clerk/nextjs";

const App = () => {
  const { session } = useSession();
  const [userskin, setUserskin] = useState<UserSkin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user.id) {
      const fetchSkins = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `/api/skins/inventory/${session?.user.id}`
          );
          console.log("API response:", res.data);
          setUserskin(res.data);
        } catch (error) {
          console.error("Error fetching skins:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSkins();
    }
  }, [session?.user]);

  return (
    <>
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-4xl font-bold text-white my-10">My Inventory</h2>

          {/* Skin grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index}>
                  <div className="aspect-square rounded-md bg-[#303030]"></div>
                  <div className="h-4 bg-[#303030] rounded mt-2 w-3/4"></div>
                  <div className="h-4 bg-[#303030] rounded mt-2 w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {userskin.length > 0 ? (
                userskin.map((userskin, index) => (
                  <div key={index}>
                    <InventorySkinCard userskin={userskin} key={index} />
                  </div>
                ))
              ) : (
                <div className="h-screen">
                  <h2 className="font-semibold h-[80%] flex justify-center items-center">
                    Tanid skin alga
                  </h2>
                </div>
              )}
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default App;
