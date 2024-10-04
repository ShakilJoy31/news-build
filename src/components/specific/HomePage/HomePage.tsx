import Loader from "@/components/ui/Loader";
import ScriptTag from "@/components/ui/ScriptTag/ScriptTag";
import { fetchCategories } from "@/lib/categoryApi";
import { fetchSettings } from "@/lib/settingsApi";
import React, { Suspense } from "react";
import LatestNews from "./LatestNews/LatestNews";
import MotamotOnlineJorip from "./Motamot&OnlineJorip/Motamot&OnlineJorip";
import NewsByCategorySection_1 from "./NewsByCategorySection_1/NewsByCategorySection_1";
import NewsByCategorySection_2 from "./NewsByCategorySection_2/NewsByCategorySection_2";
import {
  default as International,
  default as NewsByCategorySection_4,
} from "./NewsByCategorySection_4/NewsByCategorySection_4";
import NewsByCategorySection_5 from "./NewsByCategorySection_5/NewsByCategorySection_5";
import Saradesh from "./Saradesh/Saradesh";
import SelectiveNews from "./SpecialNews/SpecialNews";
import Videos from "./Videos/Videos";
import { CategoriesResponse } from "@/types/categoryType";

export default async function HomePage() {
  const categoriesData: CategoriesResponse | null = await fetchCategories();
  const settings = await fetchSettings();
  // console.log(settings?.setting?.client?.ad_under_nav);

  return (
    <section className="custom_container banglaFont px-2 md:px-5">
      <div className="lg:w-3/4 mx-auto my-5 lg:my-8 flex items-center justify-center">
        {settings?.setting?.client?.ad_under_nav && (
          <div
            dangerouslySetInnerHTML={{
              __html: settings.setting.client.ad_under_nav,
            }}
          />
        )}
      </div>
      <LatestNews settings={settings} />
      {/* advertise */}
      <div className="lg:w-3/4 mx-auto my-5 lg:my-8 flex items-center justify-center">
        {settings?.setting?.client?.ad_home2 && (
          <div
            dangerouslySetInnerHTML={{
              __html: settings.setting.client.ad_home2,
            }}
          />
        )}
      </div>
      <Videos />
      {/* advertise */}
      <div className="lg:w-3/4 mx-auto my-5 lg:my-8 flex items-center justify-center">
        {settings?.setting?.client?.ad_home3 && (
          <div
            dangerouslySetInnerHTML={{
              __html: settings.setting.client.ad_home3,
            }}
          />
        )}
      </div>

      <MotamotOnlineJorip />

      {/* advertise */}
      <div className="lg:w-3/4 mx-auto my-5 lg:my-8 flex items-center justify-center">
        {settings?.setting?.client?.ad_home4 && (
          <div
            dangerouslySetInnerHTML={{
              __html: settings.setting.client.ad_home4,
            }}
          />
        )}
      </div>

      <SelectiveNews settings={settings} />
      {/* advertise */}
      <div className="lg:w-3/4 mx-auto my-5 lg:my-8 flex items-center justify-center">
        {settings?.setting?.client?.ad_home5 && (
          <div
            dangerouslySetInnerHTML={{
              __html: settings.setting.client.ad_home5,
            }}
          />
        )}
      </div>
      {categoriesData?.categories[0] && (
        <NewsByCategorySection_1
          category={categoriesData.categories[0]}
          settings={settings}
        />
      )}
      {/* advertise */}
      <div className="lg:w-3/4 mx-auto my-5 lg:my-8 flex items-center justify-center">
        {settings?.setting?.client?.ad_home6 && (
          <div
            dangerouslySetInnerHTML={{
              __html: settings.setting.client.ad_home6,
            }}
          />
        )}
      </div>
      {categoriesData?.categories[1] && (
        <NewsByCategorySection_2 category={categoriesData.categories[1]} />
      )}
      {/* advertise */}
      <div className="lg:w-3/4 mx-auto my-5 lg:my-8 flex items-center justify-center">
        {settings?.setting?.client?.ad_home7 && (
          <div
            dangerouslySetInnerHTML={{
              __html: settings.setting.client.ad_home7,
            }}
          />
        )}
      </div>
      {categoriesData?.categories[2] && (
        <Saradesh category={categoriesData.categories[2]} />
      )}
      {/* advertise */}
      <div className="lg:w-3/4 mx-auto my-5 lg:my-8 flex items-center justify-center">
        {settings?.setting?.client?.ad_home8 && (
          <div
            dangerouslySetInnerHTML={{
              __html: settings.setting.client.ad_home8,
            }}
          />
        )}
      </div>
      {categoriesData?.categories[3] && (
        <NewsByCategorySection_4 category={categoriesData.categories[3]} />
      )}
      {/* advertise */}
      <div className="lg:w-3/4 mx-auto my-5 lg:my-8 flex items-center justify-center">
        {settings?.setting?.client?.ad_home9 && (
          <div
            dangerouslySetInnerHTML={{
              __html: settings.setting.client.ad_home9,
            }}
          />
        )}
      </div>
      {categoriesData?.categories[4] && (
        <NewsByCategorySection_5 category={categoriesData.categories[4]} />
      )}
    </section>
  );
}
