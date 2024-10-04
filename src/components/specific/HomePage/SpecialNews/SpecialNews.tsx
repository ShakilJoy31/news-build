"use client";

import VideoCard from "@/components/ui/VideoCard/VideoCard";
import { newsData } from "@/data/newsData";
import { useFavouritePostsQuery } from "@/redux/api/postApi";
import { Post } from "@/types/postType";
import { htmlToTextConverter } from "@/utils/htmlToTextConverter";
import Image from "next/image";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import special from "../../../../../public/icons/special.png";

const SelectiveNews = ({ settings }: { settings: any }) => {
  const { data, isLoading } = useFavouritePostsQuery({});
  const favouriteNews = data?.posts;

  return (
    <section className=" font-solayman grid md:grid-cols-5 grid-cols-4 gap-5">
      <div className="col-span-4">
        <div className="flex items-center justify-between border-b-4 border-gray-700 pb-2 mb-5">
          <Link href="/বাছাইকৃত" className="flex items-center gap-3">
            <Image src={special} width={25} height={25} alt="special" />
            <h1 className="text-2xl font-semibold text-primary">বাছাইকৃত</h1>
          </Link>

          <Link
            href="/বাছাইকৃত"
            className="text-base flex items-center gap-3 hover:text-secondary"
          >
            <FaRegArrowAltCircleRight className="w-7 h-7" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer border border-gray-300 p-2 rounded-md min-h-[350px] animate-pulse"
                >
                  <div className="bg-gray-300 w-full h-40 rounded-md"></div>
                  <div className="mt-3 z-10 overflow-hidden">
                    <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-5/6 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-5/6 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-5/6 mb-2 rounded"></div>
                  </div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
        transition-all duration-300 z-0"
                  />
                </div>
              ))
            : favouriteNews?.slice(0, 4)?.map((news: Post) => (
                <Link
                  href={`/${news?.category?.slug}/${news?.slug}`}
                  key={news.id}
                  className="relative group cursor-pointer border border-gray-300 p-2 rounded-md min-h-[350px]"
                >
                  {news?.thumbnail ? (
                    <Image
                      src={news.thumbnail ? news.thumbnail : ""}
                      alt={news.title ? news.title : ""}
                      width={200}
                      height={100}
                      className="w-full rounded-md"
                    />
                  ) : (
                    <div className="bg-gray-100 rounded-md w-full h-40 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  <div className="mt-3 z-10 overflow-hidden">
                    <h3 className="font-bold text-xl group-hover:text-secondary z-10">
                      {news.title}
                    </h3>
                    <p className=" text-lg mt-2 line-clamp-3">
                      {htmlToTextConverter(news.content ? news.content : "")}
                    </p>
                  </div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
                    transition-all duration-300 z-0"
                  />
                </Link>
              ))}
        </div>
      </div>
      <div>
        <div className="col-span-1 hidden md:flex mb-5">
          {settings?.setting?.client?.ad_sidebar1 && (
            <div
              dangerouslySetInnerHTML={{
                __html: settings.setting.client.ad_sidebar1,
              }}
            />
          )}
        </div>
        <div className="col-span-1 hidden md:flex">
          {settings?.setting?.client?.ad_sidebar2 && (
            <div
              dangerouslySetInnerHTML={{
                __html: settings.setting.client.ad_sidebar2,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SelectiveNews;
