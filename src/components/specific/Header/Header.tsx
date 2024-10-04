import { fetchCategories } from "@/lib/categoryApi";
import { fetchAllPosts } from "@/lib/postApi";
import { fetchSettings } from "@/lib/settingsApi";
import { CategoriesResponse } from "@/types/categoryType";
import { Post, PostsResponse } from "@/types/postType";
import React from "react";
import BottomHeader from "./BottomHeader";
import TopHeader from "./TopHeader";

const Header: React.FC = async () => {
  let categories: CategoriesResponse | null = null;
  let settings = null;
  let posts: Post[] | null = null;

  try {
    categories = await fetchCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  try {
    settings = await fetchSettings();
  } catch (error) {
    console.error("Failed to fetch settings:", error);
  }

  try {
    const postData: PostsResponse | null = await fetchAllPosts({ limit: 10 });
    posts = postData?.posts || null;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <section className="shadow-md sticky top-0 left-0 w-full bg-white z-[100]">
      <div className="w-full h-full">
        <div className="">
          <TopHeader
            settings={settings}
            posts={posts || []}
            categories={categories?.categories || []}
          />
        </div>
        <div className="hidden md:flex">
          <BottomHeader categories={categories?.categories ?? []} />
        </div>
      </div>
    </section>
  );
};

export default Header;
