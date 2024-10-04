"use client";

import VideoCard from "@/components/ui/VideoCard/VideoCard";
import { useGetSubCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useFavouritePostsQuery,
  useGetVideoPostsQuery,
} from "@/redux/api/postApi";
import { Category } from "@/types/categoryType";
import { PostsResponse } from "@/types/postType";
import { htmlToTextConverter } from "@/utils/htmlToTextConverter";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CategoryNewsesProps {
  data: PostsResponse;
  category: string;
}

const CategoryNewses = ({ data, category }: CategoryNewsesProps) => {
  const [decodedPath, setDecodedPath] = useState<string>("");
  const [visiblePosts, setVisiblePosts] = useState<number>(5);
  const [videosToShow, setVideosToShow] = useState<number>(12);
  const [subCatId, setSubCatId] = useState<number | null>(null);

  const { data: videos, isLoading } = useGetVideoPostsQuery({});
  const successVideoPosts = videos?.videoPosts?.filter(
    (video: any) => video?.status === "approved"
  );

  const { data: favouriteNews } = useFavouritePostsQuery({});

  // sub categories find by category slug
  const { data: subCategories } = useGetSubCategoriesQuery(category);
  // console.log(subCategories);

  useEffect(() => {
    setDecodedPath(decodeURIComponent(category));
  }, [category]);

  let newsData = subCatId
    ? data?.posts?.filter((post) => post?.subCategoryId === subCatId)
    : data?.posts;
  // console.log(newsData);

  if (decodedPath === "বাছাইকৃত") {
    newsData = favouriteNews?.posts;
  }

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };

   const handleLoadMoreVideos = () => {
     setVideosToShow((prev) => prev + 12); 
   };

  let content;

  if (decodedPath === "ভিডিও") {
    content = (
      <section className="font-solayman border border-gray-300 p-2 rounded-md my-10  px-2 md:px-5">
        <div className="flex items-center justify-between">
          <Link href="/ভিডিও" className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-primary mt-1">ভিডিও</h1>
          </Link>
        </div>

        <hr className="mb-5 mt-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full cursor-pointer font-solayman animate-pulse"
                >
                  <div className="relative group">
                    <div className="bg-gray-300 w-full h-48 md:h-60 rounded"></div>
                    <div
                      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
          transition-all duration-300
          "
                    />
                  </div>
                  <div className="mt-3">
                    <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                  </div>
                </div>
              ))
            : successVideoPosts
                ?.slice(0, videosToShow)
                ?.map((video: any) => <VideoCard key={video.id} {...video} />)}
        </div>
        {successVideoPosts?.length > videosToShow && (
          <button
            onClick={handleLoadMoreVideos}
            className="bg-secondary hover:bg-primary text-white py-2 rounded-md mt-10 mb-3 mx-auto block px-4 text-xs font-solayman"
          >
            আরো দেখুন
          </button>
        )}
      </section>
    );
  } else {
    content = (
      <section className="my-10 font-solayman px-2 md:px-5">
        <>
          <>
            {/* layout 1 */}
            <div className="border border-gray-300 p-2 rounded-md">
              {category && decodedPath ? (
                <div className="mb-4 mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Link
                    href={`/${decodedPath}`}
                    className="text-3xl font-semibold uppercase text-primary"
                    onClick={() => setSubCatId(null)}
                  >
                    {decodedPath}
                  </Link>
                  {subCategories?.subCategories?.map((subCat: Category) => {
                    return (
                      <Link
                        href={`/${decodedPath}?subCatagory=${subCat?.slug}`}
                        onClick={() => setSubCatId(subCat?.id)}
                        className={`text-xl font-semibold cursor-pointer hover:text-secondary ${
                          subCatId === subCat?.id && "text-secondary"
                        }`}
                        key={subCat?.id}
                      >
                        {subCat?.name}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="mb-4 mt-2 flex  items-center gap-3">
                  <div className="bg-gray-100 h-10 w-20 rounded-md"></div>
                </div>
              )}

              {newsData?.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-5">
                  {newsData && newsData?.length > 0 ? (
                    <Link
                      href={`/${category}/${newsData[0]?.slug}`}
                      className="md:row-span-2 rounded-md relative w-full h-auto"
                    >
                      {newsData[0]?.thumbnail ? (
                        <Image
                          src={newsData[0]?.thumbnail!}
                          alt={newsData[0]?.title!}
                          width={1000}
                          height={450}
                          className="rounded-md w-full h-full"
                        />
                      ) : (
                        <div className="h-96 w-full rounded-md"></div>
                      )}
                      <div className="absolute h-full w-full top-0 left-0 flex flex-wrap items-center justify-center z-20 p-2">
                        <h1 className="lg:text-3xl md:text-xl sm:text-3xl text-xl text-center text-white font-semibold">
                          {newsData[0]?.title}
                        </h1>
                      </div>
                      <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-30 z-10 rounded-md"></div>
                    </Link>
                  ) : (
                    <div className="animate-pulse md:row-span-2 rounded-md relative bg-gray-300 h-96 w-full"></div>
                  )}
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                    {newsData && newsData.length > 0
                      ? newsData.slice(1, 5)?.map((news) => (
                          <Link
                            key={news?.id}
                            href={`/${category}/${news?.slug}`}
                            className="rounded-md relative w-full h-auto"
                          >
                            {news?.thumbnail ? (
                              <Image
                                src={news?.thumbnail!}
                                alt={news?.title!}
                                width={500}
                                height={350}
                                className="!rounded-md"
                              />
                            ) : (
                              <div className="h-full w-full rounded-md"></div> // Fallback for missing thumbnail
                            )}
                            <div className="absolute h-full w-full top-0 left-0 flex items-end justify-center z-20 p-2">
                              <h1 className="text-xl text-white font-semibold text-center">
                                {news?.title}
                              </h1>
                            </div>
                            <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-30 z-10 rounded-md"></div>
                          </Link>
                        ))
                      : Array.from({ length: 4 }).map((_, index) => (
                          <div
                            key={index}
                            className="animate-pulse rounded-md relative bg-gray-300 h-48 w-full"
                          ></div>
                        ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <h1 className="text-3xl font-semibold">No news found</h1>
                </div>
              )}
            </div>
            {/* layout 2 */}
            <div className="lg:w-3/4 mx-auto w-full my-5 flex flex-col gap-5 font-solayman">
              {
                newsData &&
                  newsData.length > 0 &&
                  newsData.slice(5, 5 + visiblePosts)?.map((news) => (
                    <Link key={news?.id} href={`/${category}/${news?.slug}`}>
                      <div className="md:h-64 h-full flex md:flex-row flex-col items-center justify-between gap-5 border border-gray-300 p-2 rounded-md">
                        <Image
                          src={news?.thumbnail!}
                          alt={news?.title!}
                          width={200}
                          height={200}
                          className="md:w-[40%] w-full h-full rounded-md object-cover"
                        />
                        <div className="md:w-[60%] w-full">
                          <h3 className="text-xl md:text-2xl font-semibold">
                            {news?.title}
                          </h3>
                          <div className="text-lg text-justify line-clamp-5">
                            {news?.content
                              ? parse(news?.content)
                              : "Content not available"}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                // : Array.from({ length: visiblePosts }).map((_, index) => (
                //     <div
                //       key={index}
                //       className="animate-pulse md:h-64 h-full flex md:flex-row flex-col items-center justify-between gap-5 border border-gray-300 p-2 rounded-md"
                //     >
                //       <div className="bg-gray-300 md:w-[40%] w-full h-full rounded-md object-cover"></div>
                //       <div className="md:w-[60%] w-full space-y-2">
                //         <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
                //         <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
                //         <div className="bg-gray-300 h-4 w-5/6 mb-2 rounded"></div>
                //         <div className="bg-gray-300 h-4 w-2/3 mb-2 rounded"></div>
                //       </div>
                //     </div>
                //   ))
              }
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={loadMorePosts}
                className={`bg-secondary py-1 px-5 text-white font-solayman rounded-md text-lg mt-5 ${
                  newsData?.length <= 5 + visiblePosts ? "hidden" : "flex"
                }`}
              >
                আরও
              </button>
            </div>
          </>
        </>
      </section>
    );
  }

  return <>{content}</>;
};

export default CategoryNewses;
