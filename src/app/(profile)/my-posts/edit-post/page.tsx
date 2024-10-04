import EditPostComponent from "@/components/specific/Profile/EditPost/EditPostComponent";
import Loader from "@/components/ui/Loader";
import { fetchCategories } from "@/lib/categoryApi";
import { Suspense } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Post",
};

const EditPost = async () => {
  const categoriesData = await fetchCategories();
  const categories = categoriesData?.categories;

  return (
    <div className="my-10 md:min-h-[calc(100vh-20rem)] min-h-[calc(100vh-15rem)]">
      <Suspense fallback={<Loader />}>
        <EditPostComponent categories={categories ?? []} />
      </Suspense>
    </div>
  );
};

export default EditPost;
