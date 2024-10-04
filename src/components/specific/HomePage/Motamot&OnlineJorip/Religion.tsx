import { Post, PostsResponse } from "@/types/postType";
import { createdAt } from "@/utils/currentDate";
import Image from "next/image";
import Link from "next/link";

type Props = {
  posts: PostsResponse;
};

const Religion = ({ posts }: Props) => {
  const filterData = posts?.posts?.filter(
    (post) => post?.category?.slug === "ধর্ম"
  );

  return (
    <div className="flex flex-col gap-5 p-2 mt-2 h-fit">
      {filterData && filterData.length > 0
        ? filterData.slice(0, 4)?.map((news) => (
            <Link
              href={`/${news?.category?.slug}/${news?.slug}`}
              key={news.id}
              className="relative group"
            >
              <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                {news?.thumbnail ? (
                  <Image
                    src={news?.thumbnail ? news?.thumbnail : ""}
                    alt={news?.title ? news?.title : ""}
                    width={250}
                    height={150}
                    className="rounded-md w-full h-full lg:w-1/2"
                  />
                ) : (
                  <div className="bg-gray-100 rounded-md w-full lg:w-1/2 h-32 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-secondary">
                    {news?.title && news?.title.length > 50
                      ? news?.title.slice(0, 50) + "..."
                      : news?.title}
                  </h3>
                  <p className="text-sm mt-1 text-gray-500">
                    {news?.createdAt && createdAt(news?.createdAt, "bn-BD")}
                  </p>
                </div>
              </div>
              <div
                className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
                transition-all duration-300 z-0"
              />
            </Link>
          ))
        : Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative group animate-pulse">
              <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                <div className="bg-gray-300 rounded-md w-full lg:w-1/2 h-32"></div>
                <div className="flex-1">
                  <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
                  <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                </div>
              </div>
              <div
                className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
        transition-all duration-300 z-0"
              />
            </div>
          ))}
    </div>
  );
};

export default Religion;
