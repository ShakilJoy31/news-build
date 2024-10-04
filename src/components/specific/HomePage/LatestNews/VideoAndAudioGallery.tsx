"use client";

import { newsData, videosData } from "@/data/newsData";
import Image from "next/image";
import { useState } from "react";
import nextIcon from "../../../../../public/icons/arrow-right.png";
import audioIcon from "../../../../../public/icons/photo-stories.png";
import playBtnIcon from "../../../../../public/icons/play-button.png";
import videoIcon from "../../../../../public/icons/video-stories.png";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

type TabProps = "video" | "audio";

export default function VideoAndAudioGallery() {
  const [activeTab, setActiveTab] = useState<TabProps>("video");

  return (
    <div className="rounded-md border border-gray-300 p-2 banglaFont">
      <div className="flex items-center justify-between">
        <div
          onClick={() => setActiveTab("video")}
          className={`flex items-center gap-3 pb-2 cursor-pointer transition-colors duration-300 ease-in-out ${
            activeTab === "video"
              ? "border-b-[3px] border-primary w-1/2"
              : "border-b-[3px] border-gray-300 w-1/2"
          }`}
        >
          <Image src={videoIcon} alt="video icon" width={25} height={25} />
          <h2 className="font-semibold">ভিডিও স্টোরি</h2>
        </div>
        <div
          onClick={() => setActiveTab("audio")}
          className={`flex items-center gap-3 pb-2 cursor-pointer transition-colors duration-300 ease-in-out ${
            activeTab === "audio"
              ? "border-b-[3px] border-primary w-1/2"
              : "border-b-[3px] border-gray-300 w-1/2"
          }`}
        >
          <Image src={audioIcon} alt="audio icon" width={25} height={25} />
          <h2 className=" font-semibold">ফটো স্টোরি</h2>
        </div>
      </div>

      {/*--------------------------------------------------- content goes here------------------------------------------------------ */}

      <div className="mt-4 h-[350px] w-full">
        {activeTab === "video" ? (
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className=" transition-opacity duration-300 ease-in-out"
          >
            {videosData.map((news) => (
              <SwiperSlide key={news.id} className="relative">
                <Image
                  src={news.thumbnail}
                  alt={news.title}
                  width={300}
                  height={500}
                  className="w-auto h-auto rounded-md"
                />
                <div className="absolute bottom-0 left-0 flex items-center justify-center w-full text-xl text-black font-semibold">
                  <h1 className="p-2">{news.title}</h1>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 cursor-pointer">
                  <Image src={playBtnIcon} alt="" className="w-auto h-auto" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className=" transition-opacity duration-300 ease-in-out"
          >
            {newsData.map((news) => (
              <SwiperSlide key={news.id} className="relative">
                <Image
                  src={news.image}
                  alt={news.title}
                  width={300}
                  height={500}
                  className="w-auto h-auto rounded-md"
                />
                <div className="absolute bottom-0 left-0 flex items-center justify-center w-full text-xl text-white font-semibold">
                  <h1 className="p-2">{news.title}</h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
