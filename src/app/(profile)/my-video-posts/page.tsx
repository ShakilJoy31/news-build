import MyVideoPost from "@/components/specific/Profile/MyVideoPost/MyVideoPost";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Videos",
};

const MyVideos = () => {
  return (
    <div className="my-10 md:min-h-[calc(100vh-20rem)] min-h-[calc(100vh-15rem)]">
      <MyVideoPost />
    </div>
  );
};

export default MyVideos;
