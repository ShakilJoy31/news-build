import LatestFavouriteTab from "@/components/ui/Latest&FavouriteTab/Latest&FavouriteTab";
import { fetchAllPosts } from "@/lib/postApi";
import { PostsResponse } from "@/types/postType";
import Image from "next/image";
import Link from "next/link";
import conversationIcon from "../../../../../public/icons//opinion-v2.png";
import mosequeIcon from "../../../../../public/icons/mosque.png";
import Motamot from "./Motamot";
import Religion from "./Religion";

const MotamotOnlineJorip = async () => {
  const latestNewsesData: PostsResponse | null = await fetchAllPosts({
    limit: 10,
  });
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 font-solayman">
      {/* left side > Motamot */}
      <div className="border border-gray-300 p-2 rounded-md h-fit">
        <Link href={`/মতামত`} className="flex items-center gap-3">
          <Image src={conversationIcon} width={35} height={35} alt="Motamot" />
          <h1 className="font-semibold text-2xl mt-1 text-primary">মতামত</h1>
        </Link>
        <div>
          {latestNewsesData && <Motamot latestNewsesData={latestNewsesData} />}
        </div>
      </div>
      {/* middle side > Online Jorip */}
      <div className="border border-gray-300 p-2 rounded-md h-fit">
        <Link
          href="/ধর্ম"
          className="flex items-center gap-3 border-b-2 border-primary pb-2"
        >
          <Image src={mosequeIcon} width={35} height={35} alt="Motamot" />
          <h1 className="font-semibold text-2xl mt-1 text-primary">ধর্ম</h1>
        </Link>
        <div className="h-fit">
          {latestNewsesData && <Religion posts={latestNewsesData} />}
        </div>
      </div>
      {/* right side > Latest and favourite news */}
      <div className="h-fit">
        {latestNewsesData && (
          <LatestFavouriteTab latestNews={latestNewsesData.posts} />
        )}
      </div>
    </section>
  );
};

export default MotamotOnlineJorip;
