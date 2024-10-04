"use client";

import { Button } from "@/components/ui/button";
import { newsData } from "@/data/newsData";
import { useFavouritePostsQuery } from "@/redux/api/postApi";
import { Post } from "@/types/postType";
import Link from "next/link";
import React, { useState } from "react";

const JonoPriyo = () => {
  const { data, isLoading } = useFavouritePostsQuery({});
  const favouriteNews = data?.posts;

  return (
    <div className="border border-gray-300 p-2 rounded-md h-fit">
      <div className="flex items-center border-b-2">
        <h1
          className={`cursor-pointer font-semibold text-lg text-center pb-2 -mb-[5px] text-primary`}
        >
          জনপ্রিয় খবর
        </h1>
      </div>

      <div className="mt-5 h-[500px] overflow-auto scrollbar_width">
        <div className="flex flex-col gap-5">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 animate-pulse"
                >
                  <div>
                    <div className="bg-gray-300 h-7 w-7 rounded-full flex items-center justify-center"></div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-300 h-5 w-3/4 mb-2 rounded"></div>
                  </div>
                </div>
              ))
            : favouriteNews?.slice(0,15)?.map((news: Post, index: number) => (
                <Link
                  href={`/${news?.category?.slug}/${news?.slug}`}
                  key={news?.id}
                  className="flex items-start gap-3 group"
                >
                  <div>
                    <div className="bg-gray-300 group-hover:bg-primary group-hover:text-white h-7 w-7 rounded-full flex items-center justify-center font-semibold">
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
      </div>
    </div>
  );
};

export default JonoPriyo;
