import AddVideoPostForm from "@/components/specific/Profile/AddVideoPost/AddVideoPostComp";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Video",
};

const AddVideoPost = () => {
  return (
    <div className="my-10 md:min-h-[calc(100vh-20rem)] min-h-[calc(100vh-15rem)]">
      <AddVideoPostForm />
    </div>
  );
};

export default AddVideoPost;
