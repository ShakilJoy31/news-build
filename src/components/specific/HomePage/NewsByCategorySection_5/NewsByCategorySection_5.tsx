import { fetchPostsByCategory } from "@/lib/postApi";
import { Category } from "@/types/categoryType";
import { PostsResponse } from "@/types/postType";
import { createdAt, currentDate } from "@/utils/currentDate";
import { htmlToTextConverter } from "@/utils/htmlToTextConverter";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const NewsByCategorySection_5 = async ({
  category,
}: {
  category: Category;
}) => {
  const data: PostsResponse | null = await fetchPostsByCategory({
    slug: category?.slug,
  });

  // console.log(data?.posts);
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

      <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
        <Link
          href={`/${category?.slug}/${newsData?.[0]?.slug ?? ""}`}
          className="group p-2"
        >
          {newsData?.[0]?.thumbnail ? (
            <Image
              src={newsData?.[0]?.thumbnail ?? ""}
              alt={newsData?.[0]?.title ?? ""}
              width={300}
              height={400}
              className="w-full rounded-md"
            />
          ) : (
            <div className="bg-gray-100 h-64 rounded-md"></div>
          )}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mt-3 mb-1 group-hover:text-secondary">
              {newsData?.[0]?.title ?? ""}
            </h3>
            <div className="text-lg text-justify  line-clamp-5 ">
              {parse(`
                  ${newsData?.[0]?.content}
                `)}
            </div>
            <p className="text-sm mt-1 text-gray-500">
              {createdAt(newsData?.[0]?.createdAt || new Date(), "bn-BD")}
            </p>
          </div>
        </Link>

        <div className="flex flex-col gap-5 p-2">
          {newsData?.slice(1, 4)?.map((news) => (
            <Link
              href={`/${category?.slug}/${news?.slug}`}
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
                  <div className="bg-gray-100 w-full lg:w-1/2 h-32 rounded-md flex items-center justify-center">
                    No Image
                  </div>
                )}
                <div className="w-full lg:w-1/2">
                  <h3 className="font-semibold text-xl md:text-lg group-hover:text-secondary">
                    {news?.title}
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
        transition-all duration-300 z-0
        "
              />
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3 p-2">
          {newsData?.slice(4, 10)?.map((news) => (
            <Link
              href={`/${category?.slug}/${news?.slug}`}
              key={news?.id}
              className="flex items-start gap-3"
            >
              <div>
                <div className="bg-gray-300 h-8 w-8 rounded-full flex items-center justify-center font-semibold">
                  <IoIosArrowForward />
                </div>
              </div>
              <div>
                <h1 className="font-semibold text-lg">{news?.title}</h1>
                <p className="text-xs text-gray-500">
                  {createdAt(news?.createdAt || new Date(), "bn-BD")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsByCategorySection_5;
