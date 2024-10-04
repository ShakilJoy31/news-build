import { Category } from "@/types/categoryType";
import Image from "next/image";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import phototIcon from "../../../../public/icons/photo-stories.png";
import vidoIcon from "../../../../public/icons/video-stories.png";

type Props = {
  categories: Category[];
  setMenuOpen: (value: boolean) => void;
  menuOpen: boolean;
};

const MobileMenu = ({ categories, setMenuOpen, menuOpen }: Props) => {
  const mainCategories = categories.filter((cat) => cat.parentId === null);

  return (
    <div className="px-3 py-5 h-full overflow-auto">
      <div className="font-solayman font-normal">
        {new Date().toLocaleDateString("bn-BD", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {/* <hr className="mb-3 mt-1" /> */}

        {/* <div className="relative h-10">
          <input
            type="text"
            name=""
            id=""
            placeholder="খুঁজুন"
            className="w-full h-10 p-2 border border-gray-400 rounded focus:outline-none focus:border-primary"
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-1 bg-primary rounded-md h-8 w-10 flex items-center justify-center">
            <IoSearchOutline className="text-white w-5 h-5" />
          </div>
        </div> */}

        <hr className="my-3" />

        <ul className="grid grid-cols-2 gap-x-7 gap-y-2 h-full overflow-auto pb-10">
          {mainCategories?.map((category) => (
            <li
              key={category?.id}
              className="text-lg font-bold cursor-pointer hover:text-primary border-b border-gray-300 py-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Link href={`/${category?.slug}`}>{category?.name}</Link>
            </li>
          ))}
          <li className="text-lg font-bold cursor-pointer hover:text-primary border-b border-gray-300 py-2">
            <Link className="flex items-center gap-2" href="/">
              <Image src={vidoIcon} width={20} height={20} alt="" />
              <p className="mt-1">ভিডিও স্টোরি</p>
            </Link>
          </li>
          <li className="text-lg font-bold cursor-pointer hover:text-primary border-b border-gray-300 py-2">
            <Link className="flex items-center gap-2" href="/">
              <Image src={vidoIcon} width={20} height={20} alt="" />
              <p className="mt-1">ভিডিও গ্যালারি</p>
            </Link>
          </li>
          <li className="text-lg font-bold cursor-pointer hover:text-primary border-b border-gray-300 py-2">
            <Link className="flex items-center gap-2" href="/">
              <Image src={phototIcon} width={20} height={20} alt="" />
              <p className="mt-1">ফটো স্টোরি</p>
            </Link>
          </li>
          <li className="text-lg font-bold cursor-pointer hover:text-primary border-b border-gray-300 py-2">
            <Link className="flex items-center gap-2" href="/">
              <Image src={phototIcon} width={20} height={20} alt="" />
              <p className="mt-1">ফটোগ্যালারি</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
