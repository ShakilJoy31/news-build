import MyPostsPage from "@/components/specific/Profile/MyPosts/MyPostPage";
import { fetchAllPosts } from "@/lib/postApi";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Posts",
};

const MyPost = async () => {
  return (
    <div className="my-10 md:min-h-[calc(100vh-20rem)] min-h-[calc(100vh-15rem)]">
      <MyPostsPage />
    </div>
  );
};

export default MyPost;
