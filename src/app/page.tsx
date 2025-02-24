"use client";

import { MainLayout } from "./common/MainLayout";
import React from "react";
import SkinCard from "./components/skin-card";

import { Filter } from "./components/Filter";

const App: React.FC = () => {
  return (
    <>
      <MainLayout>
        <div className="flex">
          <div className="flex-1 flex justify-center h-full  bg-gray-800">
            <SkinCard
              image="/marblefade.png"
              price={2335}
              condition="MW"
              floatValue={0.1117562}
              name="Butterfly Knife | Marble Fade (Factory New)
"
            />
          </div>
          <Filter />
        </div>
      </MainLayout>
    </>
  );
};

export default App;
