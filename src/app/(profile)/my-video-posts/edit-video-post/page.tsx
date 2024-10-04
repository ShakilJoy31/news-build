import EditVideoPostForm from "@/components/specific/Profile/EditVideoPost/EditVideoPost";
import Loader from "@/components/ui/Loader";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Video",
};

const EditVideoPost = () => {
  return (
    <div className="my-10 md:min-h-[calc(100vh-20rem)] min-h-[calc(100vh-15rem)]">
      <Suspense fallback={<Loader />}>
        <EditVideoPostForm />
      </Suspense>
    </div>
  );
};

export default EditVideoPost;
