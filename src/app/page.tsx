"use client";

import { MainLayout } from "./common/MainLayout";
import React from "react";
import SkinCard from "./components/skin-card";

const App: React.FC = () => {
  return (
    <>
      <MainLayout>
        <div>hi</div>
      </MainLayout>
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <SkinCard
          image="/sapphire.png"
          price={0.85}
          condition="MW"
          floatValue={0.1117562}
          name="Sapphire Dagger"
        />
      </div>
    </>
  );
};

export default App;
