"use client";

import useViewCounter from "@/utils/viewCount";

export default function View({ slug }: { slug: string }) {
  const views = useViewCounter(slug);

//   console.log(views, "views");
  return (
    <div className="mt-2">
      <h1 className="font-english text-base">
        Total Views: <span className="font-bold">{views}</span>
      </h1>
    </div>
  );
}
