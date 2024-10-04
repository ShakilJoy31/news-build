"use client";

import { useGetAllCommentsQuery } from "@/redux/api/commentApi";
import { Post, PostsResponse } from "@/types/postType";
import { htmlToTextConverter } from "@/utils/htmlToTextConverter";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import noImg from "../../../../../public/images/no-image.jpg";

const Motamot = ({ latestNewsesData }: { latestNewsesData: PostsResponse }) => {
  const filteredNews = latestNewsesData?.posts?.filter(
    (post) => post?.category?.slug === "মতামত"
  );

  return (
    <div className="flex flex-col gap-5 mt-5">
      {latestNewsesData?.posts.length === 0 || filteredNews?.length === 0
        ? Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#FFF9E1] border-b-4 border-primary p-3 rounded-md animate-pulse"
            >
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="bg-gray-300 rounded-full border-2 border-primary w-12 h-12"></div>
                <div className="text-center">
                  <div className="bg-gray-300 h-4 w-24 mb-1 rounded"></div>
                  <div className="bg-gray-300 h-3 w-16 rounded"></div>
                </div>
              </div>
              <div className="mt-3">
                <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
                <div className="bg-gray-300 h-3 w-full rounded"></div>
              </div>
            </div>
          ))
        : filteredNews?.slice(0, 3)?.map((news: Post) => (
            <Link
              href={`${news?.category?.slug}/${news?.slug}`}
              key={news?.id}
              className="bg-gray-100 border-b-4 border-primary p-3 rounded-md cursor-pointer"
            >
              <div className="flex  gap-3 items-center justify-start mb-3">
                <Image
                  src={news?.author?.picture ? news?.author?.picture : noImg}
                  alt="user image"
                  width={50}
                  height={50}
                  className="w-auto h-auto rounded-full border-2 border-primary"
                />
                <div className="">
                  <h1 className="font-semibold text-secondary">
                    {news?.author?.name}
                  </h1>
                  <p className="text-xs text-gray-600">{news?.author?.email}</p>
                </div>
              </div>

              <div>
                <h1 className="font-semibold">
                  {news?.title && news?.title?.length > 50
                    ? news?.title?.slice(0, 50) + "..."
                    : news?.title}
                </h1>
                <div className="text-sm text-justify">
                  {news?.content &&
                  htmlToTextConverter(news?.content ?? "").length > 150
                    ? htmlToTextConverter(news?.content ?? "").slice(0, 150) +
                      "..."
                    : htmlToTextConverter(news?.content ?? "")}
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default Motamot;
