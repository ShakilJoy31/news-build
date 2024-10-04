"use client";

import { CustomBreadCrumb } from "@/components/ui/CustomBreadCrumb";
import LatestFavouriteTab from "@/components/ui/Latest&FavouriteTab/Latest&FavouriteTab";
import {
  useGetVideoPostBySlugQuery,
  useGetVideoPostsQuery,
} from "@/redux/api/postApi";
import { PostsResponse } from "@/types/postType";
import { createdAt } from "@/utils/currentDate";
import { extractVideoId } from "@/utils/youtubeUtils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import VideoComment from "./VideoComment";

const VideoDetails = ({
  latestNewsesData,
}: {
  latestNewsesData: PostsResponse;
}) => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const { data } = useGetVideoPostBySlugQuery(slug);
  const videoPost = data?.videoPost;

  const { data: allpost, isLoading } = useGetVideoPostsQuery({});

  const successVideoPosts = allpost?.videoPosts?.filter(
    (video: any) => video?.status === "approved" && video?.id !== videoPost?.id
  );

  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    const generateThumbnailUrl = () => {
      const videoId = extractVideoId(videoPost?.link);
      if (videoId) {
        setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
      } else {
        setVideoUrl("");
      }
    };

    generateThumbnailUrl();
  }, [videoPost?.link]);

  return (
    <section className="my-10 grid lg:grid-cols-9 md:grid-cols-7 grid-cols-3 gap-5 font-solayman px-2 md:px-5">
      {/* left container */}
      <div className="lg:col-span-2 col-span-7 space-y-3 p-2">
        <div className="">
          <CustomBreadCrumb slug="ভিডিও" title="ভিডিও" />
          <div className="flex items-start gap-2 py-3 border-t border-b border-gray-300 mt-3 lg:mt-0">
            <p className="text-base lg:text-lg">আপডেট :</p>
            {data?.videoPost?.createdAt ? (
              <div className="text-sm lg:text-base mt-[2px] text-gray-500 flex md:flex-col flex-row gap-2 md:gap-0">
                {createdAt(data?.videoPost?.createdAt, "bn-BD")}
              </div>
            ) : (
              <div className="bg-gray-300 mt-[2px] h-4 w-1/2 rounded"></div>
            )}
          </div>
        </div>

        <div className="border-l-4 border-gray-800 font-semibold text-xl py-2 pl-2 hidden lg:flex">
          <p>এ সম্পর্কিত আরও খবর</p>
        </div>
        <div className="border border-gray-300 rounded-md divide-y divide-gray-300 p-2 hidden lg:flex flex-col">
          {successVideoPosts && successVideoPosts.length > 0
            ? successVideoPosts?.slice(0,5)?.map((news: any) => {
                const videoId = extractVideoId(news?.link);
                return (
                  <Link
                    href={`/ভিডিও/video?slug=${news?.slug}`}
                    key={news.id}
                    className="py-3 flex lg:flex-row flex-col gap-3 items-center"
                  >
                    <div className="md:w-1/2 w-full">
                      <Image
                        src={
                          videoId
                            ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                            : ""
                        }
                        alt={news?.title}
                        width={700}
                        height={500}
                        className=""
                      />
                    </div>
                    <div className="md:w-1/2 w-full">
                      <p className="text-base font-semibold">
                        {news?.title && news?.title.length > 70
                          ? news?.title.slice(0, 70) + "..."
                          : news?.title}
                      </p>
                    </div>
                  </Link>
                );
              })
            : Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse py-3 flex lg:flex-row flex-col gap-3 items-center"
                >
                  <div className="md:w-1/2 w-full bg-gray-300 h-16 rounded-md"></div>
                  <div className="md:w-1/2 w-full">
                    <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      {/* middle container */}
      <div className="space-y-5 md:col-span-5 col-span-7 p-2">
        {data?.videoPost ? (
          <>
            <div>
              <h1 className="lg:text-4xl sm:text-3xl text-2xl font-bold text-center">
                {data?.videoPost?.title}
              </h1>
            </div>
            <div className="w-full">
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[215px] md:h-[450px] rounded-md"
                ></iframe>
              ) : (
                <p>Invalid YouTube URL</p>
              )}
            </div>
            <VideoComment id={data?.videoPost?.id!} />
          </>
        ) : (
          <div className="space-y-5 animate-pulse p-2">
            <div>
              <div className="bg-gray-300 h-8 w-3/4 mb-4 rounded"></div>
            </div>
            <div className="w-full bg-gray-300 h-[215px] md:h-[450px] rounded-md"></div>
          </div>
        )}
      </div>
      {/* right container */}
      <div className="md:col-span-2 col-span-7">
        <LatestFavouriteTab latestNews={latestNewsesData?.posts || []} />
      </div>
    </section>
  );
};

export default VideoDetails;
