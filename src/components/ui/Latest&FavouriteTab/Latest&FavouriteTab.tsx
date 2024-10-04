"use client";

import { newsData } from "@/data/newsData";
import { useFavouritePostsQuery } from "@/redux/api/postApi";
import { Post } from "@/types/postType";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../button";

type LatestFavouriteTabProps = {
  latestNews: Post[];
};

const LatestFavouriteTab = ({ latestNews }: LatestFavouriteTabProps) => {
  const [activeTab, setActiveTab] = useState("latest");

  const { data } = useFavouritePostsQuery({});
  const favouriteNews = data?.posts;

  // console.log(favouriteNews);

  return (
    <div className="border border-gray-300 p-2 rounded-md h-fit">
      <div className="flex items-center border-b-2">
        <h1
          className={`cursor-pointer  w-20 font-semibold text-lg border-b-8 text-center ${
            activeTab === "latest" ? "border-primary " : "border-transparent"
          } -mb-[5px]`}
          onClick={() => setActiveTab("latest")}
        >
          সর্বশেষ
        </h1>
        <h1
          className={`cursor-pointer w-20 font-semibold text-lg border-b-8 text-center ${
            activeTab === "favourite" ? "border-primary" : "border-transparent"
          } -mb-[5px]`}
          onClick={() => setActiveTab("favourite")}
        >
          জনপ্রিয়
        </h1>
      </div>

      <div className="mt-5 h-[550px] overflow-auto scrollbar_width">
        {activeTab === "latest" ? (
          <div className="flex flex-col gap-5">
            {latestNews?.slice(0, 15)?.map((news: Post, index: number) => (
              <Link
                href={`/${news?.category?.slug}/${news?.slug}`}
                key={news?.id}
                className="flex items-start gap-3 group"
              >
                <div>
                  <div className="bg-gray-300 h-7 w-7 rounded-full flex items-center justify-center font-semibold group-hover:bg-primary group-hover:text-white">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold text-base group-hover:text-primary">
                    {news?.title}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {favouriteNews?.map((news: Post, index: number) => (
              <Link
                href={`/${news?.category?.slug}/${news?.slug}`}
                key={news?.id}
                className="flex items-start gap-3 group"
              >
                <div>
                  <div className="bg-gray-300 h-7 w-7 rounded-full flex items-center justify-center font-semibold group-hover:bg-primary group-hover:text-white">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold text-base group-hover:text-primary">
                    {news?.title}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Link href="/সর্বশেষ">
        <Button className="w-full mt-3 bg-secondary text-white text-base">
          সর্বশেষ সব খবর
        </Button>
      </Link>
    </div>
  );
};

export default LatestFavouriteTab;
