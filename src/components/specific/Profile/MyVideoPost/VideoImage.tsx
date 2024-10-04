"use client";

import { extractVideoId } from "@/utils/youtubeUtils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const VideoImage = ({ link, title }: { link: string; title: string }) => {
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
    <>
      <Image
        src={thumbnailUrl ? thumbnailUrl : ""}
        alt={title}
        width={120}
        height={60}
      />
    </>
  );
};

export default VideoImage;
