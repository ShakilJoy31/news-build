import { fetchPostsByCategory } from "@/lib/postApi";
import { Category } from "@/types/categoryType";
import { PostsResponse } from "@/types/postType";
import { createdAt } from "@/utils/currentDate";
import { htmlToTextConverter } from "@/utils/htmlToTextConverter";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const NewsByCategorySection_2 = async ({
  category,
}: {
  category: Category;
}) => {
  const data: PostsResponse | null = await fetchPostsByCategory({
    slug: category?.slug,
  });

  const newsData = data?.posts;

  return (
    <section className="my-5 font-solayman border-b border-gray-300">
      <div className="flex items-center justify-between border-b-4 border-gray-700 pb-2 mb-5">
        <Link href={category?.slug} className="flex items-center gap-3">
          {category?.icon && (
            <Image
              src={category?.icon}
              width={25}
              height={25}
              alt={category?.name}
            />
          )}
          <h1 className="text-2xl font-semibold text-primary">
            {category?.name}
          </h1>
        </Link>

        <Link
          href={category?.slug}
          className="text-base flex items-center gap-3 hover:text-secondary"
        >
          <FaRegArrowAltCircleRight className="w-7 h-7" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-2 md:divide-x divide-gray-300">
        {newsData && newsData[0] ? (
          <Link
            href={`/${category?.slug}/${newsData[0]?.slug}`}
            className="group p-2 col-span-2 md:col-span-1 md:pr-5"
          >
            {newsData[0]?.thumbnail ? (
              <Image
                src={newsData[0]?.thumbnail ? newsData[0]?.thumbnail : ""}
                alt={newsData[0]?.title ? newsData[0]?.title : ""}
                width={300}
                height={400}
                className="w-full rounded-md"
              />
            ) : (
              <div className="bg-gray-100 w-full h-60 rounded-md flex items-center justify-center">
                No Image
              </div>
            )}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mt-3 mb-1 group-hover:text-secondary">
                {newsData[0]?.title}
              </h3>
              <div className="text-lg text-justify  line-clamp-5">
                {parse(`
                  ${newsData[0]?.content || ""}`)}
              </div>
              <p className="text-sm mt-1 text-gray-500">
                {createdAt(newsData[0]?.createdAt || new Date(), "bn-BD")}
              </p>
            </div>
          </Link>
        ) : (
          <div className="group p-2 animate-pulse col-span-2 md:col-span-1 md:pr-5">
            <div className="bg-gray-300 w-full h-72 rounded-md"></div>
            <div>
              <div className="bg-gray-300 h-6 w-3/4 mt-3 mb-1 rounded"></div>
              <div className="bg-gray-300 h-4 w-full mt-3 rounded"></div>
              <div className="bg-gray-300 h-4 w-5/6 mt-3 rounded"></div>
              <div className="bg-gray-300 h-3 w-1/4 mt-3 rounded"></div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 p-2 col-span-2 md:pl-5 h-fit">
          {newsData && newsData.length > 0
            ? newsData?.slice(1, 7)?.map((news) => (
                <Link
                  href={`/${category?.slug}/${news?.slug}`}
                  key={news?.id}
                  className="relative group"
                >
                  <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                    {news?.thumbnail ? (
                      <Image
                        src={news.thumbnail ? news.thumbnail : ""}
                        alt={news.title ? news.title : ""}
                        width={200}
                        height={100}
                        className="w-full lg:w-1/2 rounded-md flex-1"
                      />
                    ) : (
                      <div className="bg-gray-100 rounded-md w-full lg:w-1/2 h-40 flex items-center justify-center">
                        No Image
                      </div>
                    )}
                    <div className="w-full lg:w-1/2">
                      <h3 className="font-semibold text-xl group-hover:text-secondary">
                        {news!.title}
                      </h3>
                      <div className="text-lg text-justify  line-clamp-5 md:hidden">
                        {parse(`
                  ${news?.content}
                `)}
                      </div>
                      <p className="text-sm mt-1 text-gray-500">
                        {createdAt(news?.createdAt || new Date(), "bn-BD")}
                      </p>
                    </div>
                  </div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
                  transition-all duration-300 z-0"
                  />
                </Link>
              ))
            : Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="relative group animate-pulse">
                  <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                    <div className="bg-gray-300 w-full lg:w-1/2 h-36 rounded-md"></div>
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
      </div>
    </section>
  );
};

export default NewsByCategorySection_2;
