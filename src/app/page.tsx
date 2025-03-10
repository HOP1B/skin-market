"use client";

import { MainLayout } from "./common/MainLayout";
import React from "react";
import SkinCard from "./components/skin-card";

import { Filter } from "./components/Filter";
import { Search } from "lucide-react";

const App: React.FC = () => {
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
            <div className="flex-1 flex justify-center bg-gray-800">
              <SkinCard
                image="/marblefade.png"
                price={2335}
                condition="MW"
                floatValue={0.1117562}
                name="Butterfly Knife | Marble Fade (Factory New)"
              />
            </div>
          </div>
          <Filter />
        </div>
      </MainLayout>
    </>
  );
};

export default App;
