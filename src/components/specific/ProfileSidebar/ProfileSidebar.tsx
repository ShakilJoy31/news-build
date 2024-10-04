"use client";

import { useLoggedInUserQuery } from "@/redux/api/authApi";
import { User } from "@/types/userType";
import { getIdFromToken } from "@/utils/getIdFromToken";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaList, FaLock, FaPlus, FaSignOutAlt, FaUser } from "react-icons/fa";

const ProfileSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);

  const id = getIdFromToken();

  const { data } = useLoggedInUserQuery(id!);
  const user: User = data || {};

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const menuItems = [
    {
      title: "My Profile",
      link: "/my-profile",
      icon: <FaUser />,
      shouldHide: !user?.id,
    },
    {
      title: "My Posts",
      link: "/my-posts",
      icon: <FaList />,
      shouldHide: user?.author !== "yes",
    },
    {
      title: "Add New Post",
      link: "/add-new-post",
      icon: <FaPlus />,
      shouldHide: user?.author !== "yes",
    },
    {
      title: "My Videos",
      link: "/my-video-posts",
      icon: <FaList />,
      shouldHide: user?.author !== "yes",
    },
    {
      title: "Add New Video",
      link: "/add-video-post",
      icon: <FaPlus />,
      shouldHide: user?.author !== "yes",
    },
    {
      title: "Change Password",
      link: "/change-password",
      icon: <FaLock />,
      shouldHide: !user?.id || user?.role === "admin",
    },
  ].filter((item) => !item.shouldHide);

  return (
    <section className="my-10 w-full hidden lg:block lg:min-w-[300px] lg:w-[300px] rounded">
      <div className="overflow-hidden hidden md:block bg-white shadow-md border border-gray-100 rounded-md">
        <ul className="transition-all">
          {menuItems.map((item) => (
            <li key={item.link}>
              <Link
                href={item.link}
                className={`${
                  activeLink === item.link
                    ? "bg-secondary text-white"
                    : "hover:bg-secondary/70 hover:text-white text-[#2a3744] dark:text-white"
                } text-sm font-medium flex items-center justify-start w-full gap-2 p-3 uppercase`}
                onClick={() => setActiveLink(item.link)}
              >
                <span className="w-[20px] text-xs">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProfileSidebar;
