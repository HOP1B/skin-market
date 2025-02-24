"use client";

import { MainLayout } from "./common/MainLayout";
import React from "react";
import SkinCard from "./components/skin-card";
import ItemDetails from "./components/itemDetail";
import { Filter } from "./components/Filter";

const App: React.FC = () => {
  return (
    <>
      <MainLayout>
        <main className="flex bg-[#1d1f20] justify-between pr-4">
          <div>
            <SkinCard
              image="/sapphire.png"
              price={0.85}
              condition="MW"
              floatValue={0.1117562}
              name="Sapphire Dagger"
            />
          </div>
          <Filter />
        </main>
      </MainLayout>
      <ItemDetails />
    </>
  );
};

export default App;
