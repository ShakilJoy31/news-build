import AddNewPostForm from "@/components/specific/Profile/AddNewPost/AddNewPost";
import { fetchCategories } from "@/lib/categoryApi";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Post",
};

const AddNewPost = async () => {
  const categoriesData = await fetchCategories();
  const categories = categoriesData?.categories;

  return (
    <div className="my-10 md:min-h-[calc(100vh-20rem)] min-h-[calc(100vh-15rem)]">
      <AddNewPostForm categories={categories ?? []} />
    </div>
  );
};

export default AddNewPost;
