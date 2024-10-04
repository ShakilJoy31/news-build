"use client";

import VideoCard from "@/components/ui/VideoCard/VideoCard";
import { useGetVideoPostsQuery } from "@/redux/api/postApi";
import Image from "next/image";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import videoCamara from "../../../../../public/icons/video-stories.png";

const Videos = () => {
  const { data, isLoading } = useGetVideoPostsQuery({});

  const successVideoPosts = data?.videoPosts?.filter(
    (video: any) => video?.status === "approved"
  );

  return (
    <section className="font-solayman border border-gray-300 p-2 rounded-md">
      <div className="flex items-center justify-between">
        <Link href="/ভিডিও" className="flex items-center gap-3">
          <Image src={videoCamara} width={25} height={25} alt="video" />
          <h1 className="text-2xl font-semibold text-primary mt-1">ভিডিও</h1>
        </Link>

        <Link
          href="/ভিডিও"
          className="text-lg font-semibold flex items-center gap-3 hover:text-secondary"
        >
          <span>সব ভিডিও</span>
          <FaRegArrowAltCircleRight />
        </Link>
      </div>

      <hr className="mb-5 mt-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-full cursor-pointer font-solayman animate-pulse"
              >
                <div className="relative group">
                  <div className="bg-gray-300 w-full h-48 md:h-60 rounded"></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
        transition-all duration-300
        "
                  />
                </div>
                <div className="mt-3">
                  <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                </div>
              </div>
            ))
          : successVideoPosts
              ?.slice(0, 4)
              ?.map((video: any) => <VideoCard key={video?.id} {...video} />)}
      </div>
    </section>
  );
};

export default Videos;
