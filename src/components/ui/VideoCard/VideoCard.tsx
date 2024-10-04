"use client";

import { createdAt } from "@/utils/currentDate";
import { extractVideoId } from "@/utils/youtubeUtils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import noImg from "../../../../public/images/no-image.jpg";

const VideoCard = ({
  id,
  title,
  slug,
  link,
  createdAt: date,
}: {
  id: number;
  title: string;
  slug: string;
  link: string;
  createdAt: Date;
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    const generateThumbnailUrl = () => {
      const videoId = extractVideoId(link);
      if (videoId) {
        setThumbnailUrl(
          `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        );
      } else {
        setThumbnailUrl("");
      }
    };

    generateThumbnailUrl();
  }, [link]);

  return (
    <Link
      className="w-full cursor-pointer font-solayman"
      href={`/ভিডিও/video?slug=${slug}`}
    >
      <div className="relative group">
        <Image
          src={
            thumbnailUrl ? thumbnailUrl : noImg // Provide a fallback image path here
          }
          alt={title}
          width={700}
          height={500}
          className="w-full h-48 md:h-60 object-cover rounded"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
        transition-all duration-300"
        />
      </div>
      <h4 className="text-lg font-semibold mt-3">
        {title?.length > 100 ? title.slice(0, 100) + "..." : title}
      </h4>
      {date && (
        <p className="text-xs font-english text-gray-500 mt-1">
          {createdAt(date, "bn-BD")}
        </p>
      )}
    </Link>
  );
};

export default VideoCard;
