import Image from "next/image";

import { fetchSettings } from "@/lib/settingsApi";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import socialIcon from "../../../../public/icons/digital-marketing.png";
import facebookIcon from "../../../../public/icons/facebook.png";
import instagramIcon from "../../../../public/icons/instagram.png";
import linkedinIcon from "../../../../public/icons/linkedin.png";
import newsletter from "../../../../public/icons/newsletter.png";
import phone from "../../../../public/icons/smartphone.png";
import twitterIcon from "../../../../public/icons/twitter.png";
import youtubeIcon from "../../../../public/icons/youtube.png";

const Footer = async () => {
  const settings = await fetchSettings();
  const client = settings?.setting?.client;
  // console.log(client);
  return (
    <section className="font-solayman mt-20 text-base">
      <hr />
      <div className="custom_container flex  items-start justify-between md:gap-10 gap-3 py-5 px-5 md:px-10">
        <div className="md:w-1/4 w-full">
          <p>{client?.footer_description}</p>
        </div>
        <div className="md:w-1/3 w-full">
          <ul className="flex gap-x-5 gap-y-2 justify-end flex-wrap font-semibold">
            <li>গোপনীয়তার নীতি</li>
            <li>শর্তাবলি </li>
            <li>মন্তব্য প্রকাশের নীতিমালা</li>
            <li>বিজ্ঞাপন</li>
            <li>যোগাযোগ</li>
            <li>ছুটির তালিকা </li>
            <li>দিবস</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="custom_container flex md:flex-row flex-col items-start justify-between py-5 gap-10 px-5 md:px-10">
        <div className="md:w-1/2 w-full">
          <h1 className="font-semibold mb-1">{client?.sompadok}</h1>
          <p>{client?.location}</p>
        </div>
        <div className="md:w-1/2 w-full flex items-start md:justify-end">
          <ul>
            <li>ফোন : {client?.phone}</li>
            <li>ফ্যাক্স : {client?.fax}</li>
            <li> ই-মেইল: {client?.email}</li>
            <li>বিজ্ঞাপন বিভাগ: {client?.advertise_email}</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="custom_container py-6 flex md:flex-row flex-col md:items-center justify-between gap-10 px-5 md:px-10">
        <div>
          <div className="flex items-center">
            <Image
              src={socialIcon}
              alt="logo"
              height={50}
              width={50}
              className="pr-2 border-r-2 border-gray-400"
            />
            <p className=" font-semibold pl-2">সোশ্যাল মিডিয়া</p>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <Link href={
              client?.facebook ? client.facebook : "https://www.facebook.com"
              } target="_blank">
              <Image src={facebookIcon} alt="logo" height={35} width={35} />
            </Link>
            <Link href={
              client?.instagram ? client.instagram : "https://www.instagram.com"
              } target="_blank">
              <Image src={instagramIcon} alt="logo" height={40} width={40} />
            </Link>
            <Link href={
              client?.linkedin ? client.linkedin : "https://www.linkedin.com"
              } target="_blank">
              <Image src={linkedinIcon} alt="logo" height={35} width={35} />
            </Link>
            <Link href={
              client?.twitter ? client.twitter : "https://www.twitter.com"
              } target="_blank">
              <Image src={twitterIcon} alt="logo" height={35} width={35} />
            </Link>
            <Link href={
              client?.youtube ? client.youtube : "https://www.youtube.com"
              } target="_blank">
              <Image src={youtubeIcon} alt="logo" height={35} width={35} />
            </Link>
          </div>
        </div>

        <div className="flex sm:items-center items-start sm:flex-row flex-col lg:gap-16 sm:gap-4 gap-7 justify-between">
          <div>
            <div className="flex items-center">
              <Image
                src={newsletter}
                alt="logo"
                height={50}
                width={50}
                className="pr-2 border-r-2 border-gray-400"
              />
              <p className=" font-semibold pl-2">নিউজলেটার</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <input
                type="email"
                placeholder="ই-মেইল ঠিকানা"
                className="py-2 px-3 border-2 border-gray-400 rounded-md"
              />
              <button className="bg-secondary rounded-md text-white py-2 px-3">
                সাবস্ক্রাইব
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <Image
                src={phone}
                alt="logo"
                height={50}
                width={50}
                className="pr-2 border-r-2 border-gray-400"
              />
              <p className=" font-semibold pl-2">মোবাইল অ্যাপস</p>
            </div>
            <div className="space-y-1 ml-3 mt-3">
              <p className="flex items-center gap-1">
                <FaExternalLinkAlt />
                <span>অ্যান্ড্রয়েড</span>
              </p>
              <p className="flex items-center gap-1">
                <FaExternalLinkAlt />
                <span>আইফোন</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-gray-100 my-3">
        <div className="custom_container py-3 flex md:flex-row flex-col gap-y-2 items-center justify-between px-5 md:px-10 text-sm text-center">
          <p>{client?.copyright}</p>
          <p>ওয়েবসাইটের কোনো লেখা, ছবি, ভিডিও অনুমতি ছাড়া ব্যবহার বেআইনি।</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
