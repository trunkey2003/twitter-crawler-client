import React from "react";
import MainLayout from "../Layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
        <div className="w-full h-[80vh] bg-cover bg-center relative overflow-hidden">
          <video src="/videos/home-bg-2.mp4" className="absolute w-full" autoPlay loop muted></video>
          <div className="h-full w-full absolute z-10 bg-black bg-opacity-80"></div>
        </div>
    </MainLayout>
  );
}
