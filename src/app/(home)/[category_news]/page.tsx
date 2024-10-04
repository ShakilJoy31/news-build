import CategoryNewses from "@/components/specific/CategoryNewses/CategoryNewses";
import { fetchAllPosts, fetchPostsByCategory } from "@/lib/postApi";
import { PostsResponse } from "@/types/postType";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category News",
};

type NewsesByCategoryProps = {
  params: { category_news: string };
};

const NewsesByCategory: React.FC<NewsesByCategoryProps> = async ({
  params,
}) => {
  let data: PostsResponse | null;

  if (decodeURIComponent(params.category_news) === "সর্বশেষ") {
    data = await fetchAllPosts({ limit: 10 });
  } else {
    data = await fetchPostsByCategory({
      slug: params.category_news,
    });
  }

  if (!data) {
    // Handle the case where data is not found
    return <div>Post not found</div>;
  }

  return (
    <div className="custom_container">
      <CategoryNewses data={data} category={params.category_news} />
    </div>
  );
};

export default NewsesByCategory;
