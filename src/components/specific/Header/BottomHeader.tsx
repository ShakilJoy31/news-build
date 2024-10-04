"use client";

import { Category } from "@/types/categoryType";
import { currentDate } from "@/utils/currentDate";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import photoIcon from "../../../../public/icons/photo-stories.png";
import vidoIcon from "../../../../public/icons/video-stories.png";

interface BottomHeaderProps {
  categories: Category[];
}

const BottomHeader: React.FC<BottomHeaderProps> = ({ categories }) => {
  const pathname = usePathname();
  const [decodedPath, setDecodedPath] = useState<string>("");
  const [hoverMenu, setHoverMenu] = useState(false);

  useEffect(() => {
    setDecodedPath(decodeURIComponent(pathname));
  }, [pathname]);
  // console.log(decodedPath);

  const mainCategories = categories.filter((cat) => cat.parentId === null);

  return (
    <section className="bottom-header  font-solayman font-bold w-full px-2 md:px-5">
      <hr className="mb-1 mt-2" />
      <div className="custom_container relative">
        <ul className="  flex items-center justify-center  gap-8 py-3 overflow-x-auto my-1 px-10">
          <li
            className={`hover:text-secondary  transition-all duration-300
                  ${hoverMenu ? "opacity-0" : "opacity-100"}
                  ${
                    decodedPath.startsWith(`/সর্বশেষ`) ? "text-secondary" : ""
                  }`}
          >
            <Link
              className="text-base md:text-lg"
              href={`/সর্বশেষ
`}
            >
              সর্বশেষ
            </Link>
          </li>
          {mainCategories?.slice(0, 12)?.map((category) => (
            <li
              key={category.id}
              className={`hover:text-secondary  transition-all duration-300
                  ${hoverMenu ? "opacity-0" : "opacity-100"}
                  ${
                    decodedPath.startsWith(`/${category.slug}`)
                      ? "text-secondary"
                      : ""
                  }`}
            >
              <Link className="text-base md:text-lg" href={`/${category.slug}`}>
                {category.name}
              </Link>
            </li>
          ))}
          <div
            onMouseEnter={() => setHoverMenu(true)}
            onMouseLeave={() => setHoverMenu(false)}
          >
            <li className="cursor-pointer">
              <RiMenu4Fill className="w-6 h-6" />
            </li>

            {/* hover menu */}
            <div
              className={`min-h-48 p-5 w-full border border-gray-200 rounded-md absolute left-0 z-[100] bg-white shadow-lg transition-opacity duration-300 transform ${
                hoverMenu
                  ? "opacity-100 translate-y-0"
                  : "opacity-0  pointer-events-none"
              }`}
            >
              <div className="mb-3">{currentDate("bn-BD")}</div>
              <ul className="grid lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-5 grid-cols-3 gap-3 border-t border-b py-5 border-gray-200">
                {mainCategories?.map((category) => (
                  <li
                    key={category.id}
                    className={`hover:text-secondary  ${
                      decodedPath.startsWith(`/${category.slug}`)
                        ? "text-secondary"
                        : ""
                    }`}
                  >
                    <Link
                      className="text-base md:text-lg"
                      href={`/${category.slug}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="md:w-3/4 w-full mx-auto">
                <ul className="grid sm:grid-cols-4 grid-cols-2 mt-5">
                  <li>
                    <Link className="flex items-center gap-2" href="/">
                      <Image src={vidoIcon} width={20} height={20} alt="" />
                      <p className="mt-1">ভিডিও স্টোরি</p>
                    </Link>
                  </li>
                  <li>
                    <Link className="flex items-center gap-2" href="/">
                      <Image src={photoIcon} width={20} height={20} alt="" />
                      <p className="mt-1">ফটো স্টোরি</p>
                    </Link>
                  </li>

                  <li>
                    <Link className="flex items-center gap-2" href="/">
                      <Image src={vidoIcon} width={20} height={20} alt="" />
                      <p className="mt-1">ভিডিও গ্যালারি</p>
                    </Link>
                  </li>
                  <li>
                    <Link className="flex items-center gap-2" href="/">
                      <Image src={photoIcon} width={20} height={20} alt="" />
                      <p className="mt-1">ফটোগ্যালারি</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </section>
  );
};

export default BottomHeader;
