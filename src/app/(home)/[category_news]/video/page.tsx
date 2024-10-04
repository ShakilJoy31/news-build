import VideoDetails from "@/components/specific/VideoDetails/VideoDetails";
import { fetchAllPosts } from "@/lib/postApi";
import { PostsResponse } from "@/types/postType";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";

const VideoPlayer = async () => {
  const latestNewsesData: PostsResponse | null = await fetchAllPosts({
    limit: 10,
  });
  return (
    <div className="custom_container px-2 md:px-5 ">
      <Suspense fallback={<Loader />}>
        <VideoDetails latestNewsesData={latestNewsesData as PostsResponse} />
      </Suspense>
    </div>
  );
};

export default VideoPlayer;
