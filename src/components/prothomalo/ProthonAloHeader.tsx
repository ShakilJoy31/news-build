import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { FaNewspaper } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
// import homeLogo from '../assets/home-logo-prothom-alo.png';

export default function ProthonAloHeader() {
    return (
        <div>
            <div className="py-2 px-4 sm:px-8 md:px-16 lg:px-36 xl:px-[350px]">
                <div className="flex justify-between items-center">
                    <Image
                        // src={homeLogo}
                        src='https://images.prothomalo.com/prothomalo/import/default/2016/03/15/f8fd008fc27ff7aa2c6eb141fcbbf572-palo-logo.jpg'
                        alt='Prothom alo home icon'
                        width={1000}
                        height={450}
                        className="rounded-md w-64 h-36"
                    />

                    {/* The upper part of header It will be shown to desktop only*/}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center w-64 gap-2 border-r border-gray-300 pr-4">
                            <Image
                                src="https://images.prothomalo.com/prothomalo-bangla%2F2024-10-02%2Fr5sw4y43%2FWebsite.jpg?auto=format%2Ccompress&fmt=webp&format=webp&w=70&dpr=1.0"
                                alt="A news"
                                width={800}
                                height={350}
                                className="w-20 h-20"
                            />
                            <h1>ইরান নাকি ইসরায়েল, প্রতিরক্ষাব্যবস্থায় কে এগিয়ে?</h1>
                        </div>

                        <div className="flex items-center w-64 gap-2 border-r border-gray-300 pr-4">
                            <Image
                                src="https://images.prothomalo.com/prothomalo-bangla%2F2024-10-02%2Fr5sw4y43%2FWebsite.jpg?auto=format%2Ccompress&fmt=webp&format=webp&w=70&dpr=1.0"
                                alt="A news"
                                width={800}
                                height={350}
                                className="w-20 h-20"
                            />
                            <h1>ইসরায়েলের বিমানঘাঁটিতে ইরানের ক্ষেপণাস্ত্রের আঘাত</h1>
                        </div>

                        <div className="flex items-center w-64 gap-2 pr-4">
                            <Image
                                src="https://images.prothomalo.com/prothomalo-bangla%2F2024-10-02%2Fr5sw4y43%2FWebsite.jpg?auto=format%2Ccompress&fmt=webp&format=webp&w=70&dpr=1.0"
                                alt="A news"
                                width={800}
                                height={350}
                                className="w-20 h-20"
                            />
                            <h1>মৌসুমি বায়ুর প্রভাবে বৃষ্টি</h1>
                        </div>
                    </div>

                </div>
            </div>

            {/* The line */}
            <div>
                <div className="h-[1px] w-full bg-gray-300"></div>
            </div>

            {/* The navigation menu */}
            <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-36 xl:px-[350px] h-16">
                <div className="flex items-center gap-x-4 h-full">
                    <div className="hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <h1>সর্বশেষ</h1>
                    </div>

                    <div className="hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <h1>রাজনীতি</h1>
                    </div>

                    <div className="hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <h1>বাংলাদেশ</h1>
                    </div>

                    <div className="hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <h1>অপরাধ</h1>
                    </div>

                    <div className="hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <h1>বিশ্ব</h1>
                    </div>

                    <div className="hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <h1>বাণিজ্য</h1>
                    </div>

                    <div className="hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <h1>মতামত</h1>
                    </div>

                    <div className="hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <h1>খেলা</h1>
                    </div>

                    <div className="hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <h1>বিনোদন</h1>
                    </div>

                    <div className="hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <h1>চাকরি</h1>
                    </div>

                    <div className="hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <h1>জীবনযাপন</h1>
                    </div>
                </div>

                {/* The right portion */}
                <div className="flex items-center gap-x-2 h-full">
                    <div className="flex items-center border-r border-gray-300 pr-4 h-full hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <IoSearchOutline size={20} className="hover:text-blue-500" />
                        <h1 className="ml-2 hover:text-blue-500">খুজুন</h1>
                    </div>

                    <div className="flex items-center border-r border-gray-300 pr-4 h-full hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <FaNewspaper size={20} className="hover:text-blue-500" />
                        <h1 className="ml-2 hover:text-blue-500">ই-পেপার</h1>
                    </div>

                    <div className="flex items-center border-r border-gray-300 pr-4 h-full hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <MdLanguage size={20} className="hover:text-blue-500" />
                        <h1 className="ml-2 hover:text-blue-500">Eng</h1>
                    </div>

                    <div className="flex items-center border-r border-gray-300 pr-4 h-full hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <FaUserAlt size={20} className="hover:text-blue-500" />
                        <h1 className="ml-2 hover:text-blue-500">Login</h1>
                    </div>

                    <div className="flex items-center border-r border-gray-300 pr-4 h-full hover:text-blue-500 transition duration-300 hover:cursor-pointer">
                        <IoIosMenu size={25} className="hover:text-blue-500" />
                    </div>
                </div>
            </div>


            <div>
                <div className="h-[2px] w-full bg-gray-400"></div>
            </div>

        </div>
    );
}
