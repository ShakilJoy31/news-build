import { fetchAllPosts } from "@/lib/postApi";
import { PostsResponse } from "@/types/postType";
import { htmlToTextConverter } from "@/utils/htmlToTextConverter";
import parse from "html-react-parser";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import JonoPriyo from "./Jonopriyo";
import VideoAndAudioGallery from "./VideoAndAudioGallery";

const LatestNews = async ({ settings }: { settings: any }) => {
  const postData: PostsResponse | null = await fetchAllPosts();

  // console.log(postData.posts);
  const newsData = postData?.posts;
  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 my-5 font-solayman">
      {/* left side */}
      <div className="md:col-span-2 col-span-1   h-fit">
        {/* 1st nd latest news */}
        {newsData && newsData.length > 0 ? (
          <Link
            href={`/${newsData[0]?.category?.slug}/${newsData[0]?.slug}`}
            className="border border-gray-300 p-2 rounded-md flex lg:flex-row flex-col gap-3 relative group"
          >
            {newsData[0]?.thumbnail && (
              <Image
                src={newsData[0]?.thumbnail ? newsData[0]?.thumbnail : ""}
                alt={newsData[0]?.title ? newsData[0]?.title : ""}
                width={350}
                height={200}
                className="rounded-md w-auto "
              />
            )}
            <div>
              {/* <h2 className="text-2xl text-primary font-semibold ">
              {newsData[0].subTitle} /
            </h2> */}
              <h3 className="text-xl md:text-2xl font-bold group-hover:text-secondary">
                {newsData[0]?.title}
              </h3>
              <div className="text-lg text-justify  line-clamp-5">
                {parse(`
                  ${newsData[0]?.content}
                `)}
              </div>
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
        transition-all duration-300 z-0
        "
            />

            <div className="absolute right-2 top-2">
              {" "}
              <div className=" pulse_loader"></div>
            </div>
          </Link>
        ) : (
          <div className="border border-gray-300 p-2 rounded-md flex lg:flex-row flex-col gap-3 animate-pulse">
            <div className="bg-gray-300 rounded-md w-80 h-48"></div>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-300 h-8 w-3/4 rounded-md"></div>
              <div className="bg-gray-300 h-6 w-full rounded-md"></div>
              <div className="bg-gray-300 h-6 w-5/6 rounded-md"></div>
              <div className="bg-gray-300 h-6 w-2/3 rounded-md"></div>
            </div>
          </div>
        )}

        {newsData && newsData.length > 0 ? (
          <div className="border border-gray-300 p-2 rounded-md grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5 gap-5 divide-y md:divide-y-0 divide-gray-200">
            {newsData?.slice(1, 7)?.map((news) => (
              <Link
                href={`${news?.category?.slug}/${news?.slug}`}
                key={news.id}
                className="relative group cursor-pointer pt-3 md:pt-0"
              >
                {news?.thumbnail ? (
                  <Image
                    src={news?.thumbnail ? news?.thumbnail : ""}
                    alt={news?.title ? news?.title : ""}
                    width={200}
                    height={100}
                    className="w-full rounded-md"
                  />
                ) : (
                  <div className="bg-gray-100 w-full h-28 rounded-md flex items-center justify-center text-sm">
                    Img is not available
                  </div>
                )}
                <div className="mt-3 z-10">
                  <h3 className="font-bold text-xl md:text-base group-hover:text-secondary z-10">
                    {news?.title}
                  </h3>
                  <div className="text-lg text-justify  line-clamp-5 md:hidden">
                    {parse(`
                  ${news?.content}
                `)}
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
        ) : (
          <div className="border border-gray-300 p-2 rounded-md grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5 gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="relative group cursor-pointer animate-pulse"
              >
                <div className="bg-gray-300 rounded-md w-full h-28"></div>
                <div className="mt-3 z-10">
                  <div className="bg-gray-300 h-6 w-3/4 rounded-md"></div>
                </div>
                <div
                  className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
          transition-all duration-300 z-0"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* middle */}
      <div className="col-span-1 border border-gray-300 p-2 rounded-md h-fit">
        {newsData && newsData[7] ? (
          <Link
            href={`/${newsData[7]?.category?.slug}/${newsData[7]?.slug}`}
            className="relative group"
          >
            {newsData[7]?.thumbnail ? (
              <Image
                src={newsData[7]?.thumbnail || ""}
                alt={newsData[7]?.title || ""}
                width={300}
                height={170}
                className="w-full h-full rounded-md mb-3"
              />
            ) : (
              <div className="bg-gray-100 w-full h-44 rounded-md mb-3 flex items-center justify-center">
                Img is not available
              </div>
            )}
            <div className="">
              <h3 className="font-bold text-xl md:text-lg group-hover:text-secondary">
                {newsData[7]?.title}
              </h3>
              <div className="text-lg text-justify  line-clamp-5 md:hidden">
                {parse(`
                  ${newsData[7]?.content}
                `)}
              </div>
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
      transition-all duration-300 z-0"
            />
          </Link>
        ) : (
          <div className="relative group animate-pulse">
            <div className="bg-gray-300 w-full h-48 rounded-md mb-3"></div>
            <div className="md:text-base text-xl">
              <div className="bg-gray-300 h-6 w-3/4 rounded-md"></div>
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
      transition-all duration-300 z-0"
            />
          </div>
        )}

        <div className="flex flex-col gap-3 mt-3">
          {newsData?.slice(8, 11)?.length
            ? newsData.slice(8, 11).map((news) => (
                <Link
                  href={`/${news?.category?.slug}/${news?.slug}`}
                  key={news?.id}
                  className="relative group"
                >
                  <hr className="mb-3" />
                  <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                    {news?.thumbnail ? (
                      <Image
                        src={news.thumbnail || ""}
                        alt={news.title || ""}
                        width={1000}
                        height={700}
                        className="rounded-md w-full lg:w-1/2 lg:h-24"
                      />
                    ) : (
                      <div className="bg-gray-100 w-full lg:w-1/2 lg:h-24 rounded-md flex items-center justify-center">
                        Img is not available
                      </div>
                    )}
                    <h3 className="font-semibold text-xl md:text-lg group-hover:text-secondary w-full lg:w-1/2">
                      {news?.title && news?.title?.length > 50
                        ? news?.title.slice(0, 50) + "..."
                        : news?.title}
                    </h3>
                    <div className="text-lg text-justify  line-clamp-5 md:hidden">
                      {parse(`
                  ${news?.content}
                `)}
                    </div>
                  </div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
                transition-all duration-300 z-0"
                  />
                </Link>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="relative group animate-pulse">
                  <hr className="mb-3" />
                  <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                    <div className="bg-gray-300 rounded-md w-full lg:w-1/2 h-24"></div>
                    <div className="bg-gray-300 h-6 w-full lg:w-1/2 rounded-md"></div>
                  </div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center
        transition-all duration-300 z-0"
                  />
                </div>
              ))}
          {settings?.setting?.client?.ad_home1 && (
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{
                __html: settings.setting.client.ad_home1,
              }}
            />
          )}
        </div>
      </div>

      {/* right side */}
      <div className="col-span-1  h-fit">
        {/* {settings?.setting?.client?.ad_videoStory_up && (
          <div
            className="mb-5"
            dangerouslySetInnerHTML={{
              __html: settings.setting.client.ad_videoStory_up,
            }}
          />
        )} */}

        {/* video & audio gallery */}
        {/* <VideoAndAudioGallery /> */}
        <JonoPriyo />

        {settings?.setting?.client?.ad_videoStory_down && (
          <div
            className="mt-5"
            dangerouslySetInnerHTML={{
              __html: settings.setting.client.ad_videoStory_down,
            }}
          />
        )}
      </div>
    </section>
  );
};

export default LatestNews;
