"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLoggedInUserQuery } from "@/redux/api/authApi";
import { Category } from "@/types/categoryType";
import { Post } from "@/types/postType";
import { User } from "@/types/userType";
import { createdAt } from "@/utils/currentDate";
import { getIdFromToken } from "@/utils/getIdFromToken";
import { logOut } from "@/utils/logOut";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { IoNotifications, IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";
import cancelIcon from "../../../../public/icons/close.png";
import loginIcon from "../../../../public/icons/login.png";
import menuIcon from "../../../../public/icons/menu.png";
import searchIcon from "../../../../public/icons/search.png";
import userIcon from "../../../../public/icons/user.png";
import logoimg from "../../../../public/images/news-logo.webp";
import MobileMenu from "./MobileMenu";

const TopHeader = ({
  settings,
  posts,
  categories,
}: {
  settings: any;
  posts: Post[];
  categories: Category[];
}) => {
  const [searchModal, setSearchModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const id = getIdFromToken();

  const { data } = useLoggedInUserQuery(id!);
  const user: User = data || {};

  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchClick = () => {
    setSearchModal(!searchModal);
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isUserVisible, setIsUserVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleUserMouseEnter = () => {
    setIsUserVisible(true);
  };

  const handleUserMouseLeave = () => {
    setIsUserVisible(false);
  };

  const handleUserClick = () => {
    setIsUserVisible(!isUserVisible);
  };

  const handleLogOut = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      logOut();
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="custom_container flex items-center justify-between py-2 font-solayman font-bold px-2 md:px-5">
      <Link href="/">
        <Image
          src={
            settings?.setting?.client?.header_logo &&
            settings?.setting?.client?.header_logo
          }
          width={200}
          height={50}
          alt="logo"
          className="w-44"
        />
      </Link>

      {/* links */}
      <ul className="hidden md:flex items-center justify-between lg:gap-14 gap-5 mt-3 ">
        <li className="  text-lg cursor-pointer hover:text-secondary">
          <Link href="/জাতীয়">জাতীয়</Link>
        </li>
        <li className="  text-lg cursor-pointer hover:text-secondary">
          <Link href="/বিশ্ব">বিশ্ব</Link>
        </li>
        <li className="  text-lg cursor-pointer hover:text-secondary">
          <Link href="/রাজনীতি">রাজনীতি</Link>
        </li>
      </ul>

      {/* icon */}
      <div className="flex items-center justify-between gap-3 lg:gap-4 mt-3">
        <div className="relative hidden md:block" ref={searchRef}>
          {/* <div
            className="bg-gray-200 p-2 rounded-full cursor-pointer"
            onClick={() => handleSearchClick()}
          >
            {searchModal ? (
              <Image src={cancelIcon} width={14} height={14} alt="close" />
            ) : (
              <Image src={searchIcon} width={14} height={14} alt="search" />
            )}
          </div> */}
          {/* search modal */}
          {searchModal && (
            <div className="absolute top-10 right-0 z-10 w-64">
              <input
                type="text"
                className="relative w-full h-full bg-white border border-gray-300 shadow-lg rounded py-2 px-4 text-black text-base placeholder:text-sm focus:border-secondary focus:outline-none pl-7 placeholder:font-english font-normal
                "
                placeholder="Search Your News..."
              />
              <IoSearch className="absolute top-3 left-2" />
            </div>
          )}
        </div>

        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="relative"
        >
          <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
            <IoNotifications />
          </div>
          {isVisible && (
            <div className="absolute right-0 ml-10 w-64 p-2 bg-white shadow-lg rounded-md z-[1000] border border-gray-100">
              <div className="w-full h-96 text-black overflow-auto scrollbar_width font-solayman">
                {posts?.slice(0, 15)?.map((news, index) => (
                  <Link
                    href={`/news/${news.slug}`}
                    key={index}
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md hover:text-primary py-2 px-2 cursor-pointer"
                  >
                    <div>
                      <h1 className="text-sm">{news.title}</h1>
                      <p className="text-xs text-gray-500 english">
                        {news?.createdAt && createdAt(news?.createdAt, "BN-bd")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* user */}
        <div>
          {user?.id ? (
            <div
              onMouseEnter={handleUserMouseEnter}
              onMouseLeave={handleUserMouseLeave}
              onClick={handleUserClick}
              className="relative"
            >
              <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
                <Image src={userIcon} width={17} height={17} alt="profile" />
              </div>
              {isUserVisible && (
                <div className="absolute right-0 w-48 p-2 font-english font-medium bg-white shadow-lg rounded-md z-[1000] border border-gray-100">
                  <div className="text-sm flex flex-col gap-1 justify-start englishFont">
                    {user?.role === "admin" && (
                      <Link
                        href={`${process.env.NEXT_PUBLIC_ADMIN_API_URL}`}
                        className="text-black hover:bg-gray-100 rounded-md hover:text-primary py-1 px-2"
                        target="_blank"
                      >
                        Admin
                      </Link>
                    )}
                    <Link
                      href="/my-profile"
                      className="text-black hover:bg-gray-100 rounded-md hover:text-primary py-1 px-2"
                    >
                      My Profile
                    </Link>
                    {user?.author === "yes" && (
                      <>
                        <Link
                          href="/my-posts"
                          className="text-black hover:bg-gray-100 rounded-md hover:text-primary py-1 px-2"
                        >
                          My Posts
                        </Link>
                        <Link
                          href="/add-new-post"
                          className="text-black hover:bg-gray-100 rounded-md hover:text-primary py-1 px-2"
                        >
                          Add New Post
                        </Link>
                        <Link
                          href="/my-video-posts"
                          className="text-black hover:bg-gray-100 rounded-md hover:text-primary py-1 px-2"
                        >
                          My Videos
                        </Link>

                        <Link
                          href="/add-video-post"
                          className="text-black hover:bg-gray-100 rounded-md hover:text-primary py-1 px-2"
                        >
                          Add New Video
                        </Link>
                      </>
                    )}
                    {user?.role !== "admin" && (
                      <Link
                        href="/change-password"
                        className="text-black hover:bg-gray-100 rounded-md hover:text-primary py-1 px-2"
                      >
                        Change Password
                      </Link>
                    )}

                    {user?.id && (
                      <div
                        onClick={handleLogOut}
                        className="text-black hover:bg-gray-100 rounded-md hover:text-primary py-1 px-2 cursor-pointer"
                      >
                        Logout
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center justify-center">
                  <Link href="/signin" className="">
                    <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
                      <Image
                        src={loginIcon}
                        width={17}
                        height={17}
                        alt="profile"
                        className=""
                      />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs englishFont">Signin</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* mobile nav */}
        <div className=" flex md:hidden">
          <div onClick={() => setMenuOpen(!menuOpen)}>
            <Image src={menuIcon} width={30} height={30} alt="menu" />
          </div>
        </div>
      </div>

      {/* mobile nav modal */}
      <div
        className={`fixed top-[60px]  z-[90] w-full min-h-screen h-full pb-5 overflow-auto bg-gray-50 shadow-lg 
            transition-all duration-500 ease-in-out
            ${menuOpen ? "left-0" : "-left-full"}
            `}
      >
        <MobileMenu
          categories={categories}
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
        />
      </div>
    </section>
  );
};

export default TopHeader;
