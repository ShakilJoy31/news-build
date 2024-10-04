import { fetchPostsByCategory } from "@/lib/postApi";
import { Category } from "@/types/categoryType";
import { PostsResponse } from "@/types/postType";
import { currentDate } from "@/utils/currentDate";
import { htmlToTextConverter } from "@/utils/htmlToTextConverter";
import Image from "next/image";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import countryIcon from "../../../../../public/icons/country-news.png";
import SearchByArea from "../Saradesh/SearchByArea";

const Country = async () => {
  const category = {
    slug: "সারাদেশ",
    name: "সারাদেশ",
    icon: countryIcon,
  };
  const data: PostsResponse | null = await fetchPostsByCategory({
    slug: category?.slug,
  });

  // console.log(data?.posts);
  const newsData = data?.posts;

  return (
    <section className="my-5 font-solayman border-b border-gray-300 grid md:grid-cols-5 gap-5">
      <div className="col-span-4">
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
          <div className="col-span-4 grid md:grid-cols-3 grid-cols-2 md:divide-x divide-gray-300">
            <div className="col-span-2 h-fit flex flex-col divide-y divide-gray-300 pr-5">
              {newsData?.slice(0, 2)?.map((news) => (
                <Link
                  key={news?.id}
                  href={`/${category?.slug}/${news?.slug}`}
                  className="group py-5  flex lg:flex-row flex-col items-center gap-3 justify-center"
                >
                  <Image
                    src={news?.thumbnail!}
                    alt={news?.title!}
                    width={350}
                    height={400}
                    className="w-full h-full rounded-md"
                  />
                  <div>
                    <h3 className=" text-2xl font-semibold mt-3 mb-1 group-hover:text-secondary">
                      {news?.title}
                    </h3>
                    <p className="line-clamp-4 text-justify text-lg">
                      {htmlToTextConverter(news?.content!)}
                    </p>
                    <p className="text-sm mt-1 text-gray-500">
                      {currentDate("bn-BD")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 md:col-span-1 col-span-2 md:divide-y gap-x-5 divide-gray-300 md:pl-5 h-fit">
              {newsData?.slice(2, 5)?.map((news) => (
                <Link
                  href={`/${category?.slug}/${news?.slug}`}
                  key={news?.id}
                  className="relative group py-5"
                >
                  <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                    <Image
                      src={news?.thumbnail!}
                      alt={news?.title!}
                      width={250}
                      height={150}
                      className="rounded-md w-full h-full lg:w-1/2"
                    />
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-secondary">
                        {news!.title}
                      </h3>
                      <p className="text-sm mt-1 text-gray-500">
                        {currentDate("bn-BD")}
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
      <SearchByArea />
    </section>
  );
};

export default Country;
