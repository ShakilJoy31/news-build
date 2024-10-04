import { fetchPostsByCategory } from "@/lib/postApi";
import { Category } from "@/types/categoryType";
import { PostsResponse } from "@/types/postType";
import { createdAt, currentDate } from "@/utils/currentDate";
import { htmlToTextConverter } from "@/utils/htmlToTextConverter";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import countryIcon from "../../../../../public/icons/country-news.png";
import SearchByArea from "./SearchByArea";

const Saradesh = async ({ category }: { category: Category }) => {
  const data: PostsResponse | null = await fetchPostsByCategory({
    slug: category?.slug,
  });

  // console.log(data?.posts);
  const newsData = data?.posts;

  return (
    <section className="my-5 font-solayman border-b border-gray-300 grid md:grid-cols-5 grid-cols-4 gap-5">
      <div className="col-span-5">
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

        {newsData?.length === 0 ? (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl text-gray-500 my-10">No Data Found</h1>
          </div>
        ) : (
          <div className="md:divide-y">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  h-fit md:divide-x">
              {newsData?.slice(0, 4)?.map((news) => (
                <Link
                  href={`/${category?.slug}/${news?.slug}`}
                  key={news?.id}
                  className="relative group p-2 md:p-3"
                >
                  <div className="flex  flex-col gap-3 ">
                    {news?.thumbnail ? (
                      <Image
                        src={news?.thumbnail ? news?.thumbnail : ""}
                        alt={news?.title ? news?.title : ""}
                        width={250}
                        height={150}
                        className="rounded-md w-full h-full"
                      />
                    ) : (
                      <div className="bg-gray-100 w-full h-48 rounded-md flex items-center justify-center">
                        No Image
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-xl md:text-lg group-hover:text-secondary">
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
              transition-all duration-300 z-0
              "
                  />
                </Link>
              ))}
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  h-fit md:divide-x">
              {newsData?.slice(3, 8)?.map((news) => (
                <Link
                  href={`/${category?.slug}/${news?.slug}`}
                  key={news?.id}
                  className="relative group p-2 md:p-3"
                >
                  <div className="flex  flex-col gap-3">
                    {news?.thumbnail ? (
                      <Image
                        src={news?.thumbnail!}
                        alt={news?.title!}
                        width={250}
                        height={150}
                        className="rounded-md w-full h-full"
                      />
                    ) : (
                      <div className="bg-gray-100 w-full h-48 rounded-md flex items-center justify-center">
                        No Image
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-xl md:text-lg group-hover:text-secondary">
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
              transition-all duration-300 z-0
              "
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* find news by division district thana box */}
      {/* <div className="col-span-4 md:col-span-1"><SearchByArea /></div> */}
    </section>
  );
};

export default Saradesh;
