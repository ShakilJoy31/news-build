import { CustomBreadCrumb } from "@/components/ui/CustomBreadCrumb";
import LatestFavouriteTab from "@/components/ui/Latest&FavouriteTab/Latest&FavouriteTab";
import { fetchAllPosts, fetchPostsByCategory } from "@/lib/postApi";
import { Post, PostsResponse } from "@/types/postType";
import { createdAt } from "@/utils/currentDate";
import { htmlToTextConverter } from "@/utils/htmlToTextConverter";
import useViewCounter from "@/utils/viewCount";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import Comments from "./Comments";
import View from "./View";

interface NewsDetailsProps {
  post: Post;
  slug: string;
}

const NewsDetailsById = async ({ post, slug }: NewsDetailsProps) => {
  const otherNews: PostsResponse | null = await fetchPostsByCategory({
    slug: post?.category?.slug!,
    limit: 5,
  });

  const latestNewsesData: PostsResponse | null = await fetchAllPosts({
    limit: 10,
  });

  return (
    <section className="my-10 grid lg:grid-cols-9 md:grid-cols-7 grid-cols-3 gap-5 font-solayman px-2 md:px-5">
      {/* left container */}
      <div className="lg:col-span-2 col-span-7 space-y-3 p-2">
        <div className="">
          {post ? (
            <CustomBreadCrumb
              slug={post?.category?.slug!}
              title={post?.category?.name!}
            />
          ) : (
            <div className="bg-gray-300 h-6 w-1/2 mb-2 rounded"></div>
          )}
          <div className="flex items-start gap-2 py-3 border-t border-b border-gray-300 mt-3 lg:mt-0">
            <p className="text-base lg:text-lg">আপডেট :</p>
            {post?.createdAt ? (
              <div className="text-sm lg:text-base mt-[2px] text-gray-500 flex md:flex-col flex-row gap-2 md:gap-0">
                {createdAt(post?.createdAt, "bn-BD")}
              </div>
            ) : (
              <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
            )}
          </div>
        </div>

        <div className="border-l-4 border-gray-800 font-semibold text-xl py-2 pl-2 hidden lg:flex">
          <p>এ সম্পর্কিত আরও খবর</p>
        </div>
        <div className="border border-gray-300 rounded-md divide-y divide-gray-300 p-2 hidden lg:flex flex-col">
          {otherNews?.posts && otherNews?.posts.length > 0
            ? otherNews.posts?.slice(0, 5)?.map((news) => (
                <Link
                  href={`/${post?.category?.slug!}/${news?.slug}`}
                  key={news.id}
                  className="py-3 flex lg:flex-row flex-col gap-3 items-center"
                >
                  <div className="md:w-1/2 w-full">
                    {news?.thumbnail ? (
                      <Image
                        src={news?.thumbnail!}
                        width={200}
                        height={70}
                        alt=""
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="bg-gray-300 h-16 w-full rounded-md"></div>
                    )}
                  </div>
                  <div className="md:w-1/2 w-full">
                    <p className="text-base font-semibold">{news?.title}</p>
                  </div>
                </Link>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse py-3 flex lg:flex-row flex-col gap-3 items-center"
                >
                  <div className="md:w-1/2 w-full bg-gray-300 h-16 rounded-md"></div>
                  <div className="md:w-1/2 w-full">
                    <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      {/* middle container */}
      <div className="space-y-5 md:col-span-5 col-span-7 p-2">
        {post ? (
          <>
            <div>
              <h1 className="lg:text-4xl sm:text-3xl text-2xl font-bold text-center">
                {post?.title}
              </h1>
            </div>
            <div className="w-full">
              {post?.thumbnail && (
                <Image
                  src={post?.thumbnail!}
                  alt={post?.title!}
                  width={800}
                  height={500}
                  className="rounded-md w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <div className="text-justify text-xl leading-9">
                {parse(`${post?.content!}`)}
              </div>
              <View slug={slug} />
            </div>
            <Comments id={post?.id!} />
          </>
        ) : (
          <div className="space-y-5 animate-pulse p-2">
            <div>
              <div className="bg-gray-300 h-8 w-3/4 mb-4 rounded"></div>
            </div>
            <div className="w-full bg-gray-300 h-64 rounded-md"></div>
            <div>
              <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
              <div className="bg-gray-300 h-4 w-5/6 mb-2 rounded"></div>
              <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
              <div className="bg-gray-300 h-4 w-2/3 mb-2 rounded"></div>
            </div>
          </div>
        )}
      </div>
      {/* right container */}
      <div className="md:col-span-2 col-span-7">
        <LatestFavouriteTab latestNews={latestNewsesData?.posts || []} />
      </div>
    </section>
  );
};

export default NewsDetailsById;
