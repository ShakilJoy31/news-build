import ApnaderJonno from "./ApnaderJonno";
import HomeCard from "./HomeCard";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function ProthomAloHomePage() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-36 xl:px-[350px] ">
      <div className="flex justify-between mb-6 mt-2 gap-x-4">
        {/* Left one */}
        <div className="gap-4 border-r border-gray-400 pr-4">
          <div className="border-b border-gray-400 pb-2">
            <div className="flex">
              <h1 style={{ fontSize: '14px' }} className="font-semibold w-50">বিশেষ সাক্ষাৎকার: পর্ব ২ মাহফুজ আলম ‘মানুষ নতুন একটা রাজনৈতিক পরিসর খুঁজছে’</h1>
              <Image
                src='https://images.prothomalo.com/prothomalo-bangla%2F2024-10-03%2Fe6qeuih9%2F080031ZKS6082071727.jpg?rect=0%2C0%2C2550%2C1700&auto=format%2Ccompress&fmt=webp&format=webp&w=100&dpr=1.0'
                alt='Prothom alo home icon'
                width={1000}
                height={450}
                className="w-24 h-16"
              />
            </div>
            <p style={{ fontSize: '12px' }}>বাংলাদেশে যত ধরনের ইসলামপন্থী চিন্তাধারা আছে, গত ৫০ বছর তাদের সঙ্গে কোনো সংলাপ না হওয়ায় সংক্ষুব্ধতার জন্ম হয়েছে।</p>
            <small className="text-gray-400 hover:text-gray-500" style={{ fontSize: '10px' }}>১ ঘণ্টা আগে</small>
          </div>

          <div className="border-b border-gray-400 py-2">
            <div className="flex">
              <h1 style={{ fontSize: '14px' }} className="font-semibold w-50">ইরানের পারমাণবিক স্থাপনায় ইসরায়েলি হামলায় সায় নেই বাইডেনের</h1>
              <Image
                src='https://images.prothomalo.com/prothomalo-bangla%2F2024-10-03%2Fe6qeuih9%2F080031ZKS6082071727.jpg?rect=0%2C0%2C2550%2C1700&auto=format%2Ccompress&fmt=webp&format=webp&w=100&dpr=1.0'
                alt='Prothom alo home icon'
                width={1000}
                height={450}
                className="w-24 h-16"
              />
            </div>
            <p style={{ fontSize: '12px' }}>বাংলাদেশে যত ধরনের ইসলামপন্থী চিন্তাধারা আছে, গত ৫০ বছর তাদের সঙ্গে কোনো সংলাপ না হওয়ায় সংক্ষুব্ধতার জন্ম হয়েছে।</p>
            <small className="text-gray-400 hover:text-gray-500" style={{ fontSize: '10px' }}>১ ঘণ্টা আগে</small>
          </div>

          <div className="py-2">
            <div className="flex">
              <h1 style={{ fontSize: '14px' }} className="font-semibold w-50">মধ্যপ্রাচ্যে পাল্টাপাল্টি হামলার জেরে বিশ্ববাজারে তেলের দাম বেড়েছে</h1>
              <Image
                src='https://images.prothomalo.com/prothomalo-bangla%2F2024-10-03%2Fe6qeuih9%2F080031ZKS6082071727.jpg?rect=0%2C0%2C2550%2C1700&auto=format%2Ccompress&fmt=webp&format=webp&w=100&dpr=1.0'
                alt='Prothom alo home icon'
                width={1000}
                height={450}
                className="w-24 h-16"
              />
            </div>
            <p style={{ fontSize: '12px' }}>বাংলাদেশে যত ধরনের ইসলামপন্থী চিন্তাধারা আছে, গত ৫০ বছর তাদের সঙ্গে কোনো সংলাপ না হওয়ায় সংক্ষুব্ধতার জন্ম হয়েছে।</p>
            <small className="text-gray-400 hover:text-gray-500" style={{ fontSize: '10px' }}>১ ঘণ্টা আগে</small>
          </div>
        </div>





        {/* Middle one */}
        <div className="border-r border-gray-400 h-full pr-2">
          <div className="border-b border-gray-300 pb-4 mb-4">
            <div className="flex gap-x-2">
              <div>
                <Image
                  src='https://images.prothomalo.com/prothomalo-bangla%2F2024-05%2Ff1a6783f-ac8f-4a45-92cd-3aa6e39a2706%2Fjob_age.JPG?rect=0%2C0%2C614%2C409&auto=format%2Ccompress&fmt=webp&format=webp&w=300&dpr=1.0'
                  alt='Prothom alo home icon'
                  width={1000}
                  height={450}
                  className="w-64 h-42"
                />
                <small className="">সরকারি চাকরিতে বয়সসীমা বাড়ানোর দাবিতে আন্দোলনপ্রথম আলো ফাইল ছবি</small>
              </div>
              <div>
                <h1 style={{ fontSize: '24px' }} className="font-semibold">সরকারি চাকরিতে প্রবেশের বয়সসীমা বাড়ানো কতটা যৌক্তিক</h1>
                <p style={{ fontSize: '12px' }} className="my-1">বাংলাদেশ সিভিল সার্ভিসের ইতিহাস বইয়ের তথ্যানুযায়ী, ব্রিটিশ ভারতের শেষ দিকে আইসিএস পরীক্ষা দেওয়ার সর্বোচ্চ বয়স ছিল ২৩ বছর।</p>
              </div>
            </div>
            <small style={{ fontSize: '10px' }} className="text-gray-400 hover:text-gray-500">১ ঘণ্টা আগে</small>
          </div>

          <div className="flex border-b border-gray-300 pb-4 mb-4">
            <div className="border-r border-gray-300 pr-2 mr-2">
              <div className="flex">
                <h1 className="font-semibold">বিশেষ সাক্ষাৎকার: পর্ব ২ মাহফুজ আলম ‘মানুষ নতুন একটা রাজনৈতিক পরিসর খুঁজছে’</h1>
                <Image
                  src='https://images.prothomalo.com/prothomalo-bangla%2F2024-10-03%2Fe6qeuih9%2F080031ZKS6082071727.jpg?rect=0%2C0%2C2550%2C1700&auto=format%2Ccompress&fmt=webp&format=webp&w=100&dpr=1.0'
                  alt='Prothom alo home icon'
                  width={1000}
                  height={450}
                  className="w-28 h-16"
                />
              </div>
              <p style={{ fontSize: '12px' }}>বাংলাদেশে যত ধরনের ইসলামপন্থী চিন্তাধারা আছে, গত ৫০ বছর তাদের সঙ্গে কোনো সংলাপ না হওয়ায় সংক্ষুব্ধতার জন্ম হয়েছে।</p>
              <small style={{ fontSize: '10px' }} className="text-gray-400 hover:text-gray-500">১ ঘণ্টা আগে</small>
            </div>

            <div>
              <div className="flex">
                <h1 style={{ fontSize: '16px' }} className="font-semibold">বিশেষ সাক্ষাৎকার: পর্ব ২ মাহফুজ আলম ‘মানুষ নতুন একটা রাজনৈতিক পরিসর খুঁজছে’</h1>
                <Image
                  src='https://images.prothomalo.com/prothomalo-bangla%2F2024-10-03%2Fe6qeuih9%2F080031ZKS6082071727.jpg?rect=0%2C0%2C2550%2C1700&auto=format%2Ccompress&fmt=webp&format=webp&w=100&dpr=1.0'
                  alt='Prothom alo home icon'
                  width={1000}
                  height={450}
                  className="w-28 h-16"
                />
              </div>
              <p style={{ fontSize: '12px' }}>বাংলাদেশে যত ধরনের ইসলামপন্থী চিন্তাধারা আছে, গত ৫০ বছর তাদের সঙ্গে কোনো সংলাপ না হওয়ায় সংক্ষুব্ধতার জন্ম হয়েছে।</p>
              <small style={{ fontSize: '10px' }} className="text-gray-400 hover:text-gray-500">১ ঘণ্টা আগে</small>
            </div>
          </div>


          <div className="flex justify-center items-center">
            <div className="border-r border-gray-300 pr-2 mr-2">
              <div className="flex">
                <h1 style={{ fontSize: '14px' }} className="font-semibold w-50">হীরা পলিশের রাজধানীতে কর্মীরা কেন ‘আত্মহত্যা’ করছেন</h1>
                <Image
                  src='https://images.prothomalo.com/prothomalo-bangla%2F2024-10-03%2Fybj8n9ot%2Fdiamond.jpg?rect=0%2C0%2C3500%2C2333&auto=format%2Ccompress&fmt=webp&format=webp&w=200&dpr=1.0'
                  alt='Prothom alo home icon'
                  width={1000}
                  height={450}
                  className="w-28 h-16"
                />
              </div>
              <p style={{ fontSize: '12px' }}>বাংলাদেশে যত ধরনের ইসলামপন্থী চিন্তাধারা আছে, গত ৫০ বছর তাদের সঙ্গে কোনো সংলাপ না হওয়ায় সংক্ষুব্ধতার জন্ম হয়েছে।</p>
              <small style={{ fontSize: '10px' }} className="text-gray-400 hover:text-gray-500">১ ঘণ্টা আগে</small>
            </div>

            <div className="border-r border-gray-300 pr-2 mr-2">
              <div className="flex">
                <h1 style={{ fontSize: '14px' }} className="font-semibold w-50">হীরা পলিশের রাজধানীতে কর্মীরা কেন ‘আত্মহত্যা’ করছেন</h1>
                <Image
                  src='https://images.prothomalo.com/prothomalo-bangla%2F2024-10-03%2Fybj8n9ot%2Fdiamond.jpg?rect=0%2C0%2C3500%2C2333&auto=format%2Ccompress&fmt=webp&format=webp&w=200&dpr=1.0'
                  alt='Prothom alo home icon'
                  width={1000}
                  height={450}
                  className="w-28 h-16"
                />
              </div>
              <p style={{ fontSize: '12px' }}>বাংলাদেশে যত ধরনের ইসলামপন্থী চিন্তাধারা আছে, গত ৫০ বছর তাদের সঙ্গে কোনো সংলাপ না হওয়ায় সংক্ষুব্ধতার জন্ম হয়েছে।</p>
              <small style={{ fontSize: '10px' }} className="text-gray-400 hover:text-gray-500">১ ঘণ্টা আগে</small>
            </div>

            <div>
              <div className="flex">
                <h1 style={{ fontSize: '14px' }} className="font-semibold w-50">হীরা পলিশের রাজধানীতে কর্মীরা কেন ‘আত্মহত্যা’ করছেন</h1>
                <Image
                  src='https://images.prothomalo.com/prothomalo-bangla%2F2024-10-03%2Fybj8n9ot%2Fdiamond.jpg?rect=0%2C0%2C3500%2C2333&auto=format%2Ccompress&fmt=webp&format=webp&w=200&dpr=1.0'
                  alt='Prothom alo home icon'
                  width={1000}
                  height={450}
                  className="w-28 h-16"
                />
              </div>
              <p style={{ fontSize: '12px' }}>বাংলাদেশে যত ধরনের ইসলামপন্থী চিন্তাধারা আছে, গত ৫০ বছর তাদের সঙ্গে কোনো সংলাপ না হওয়ায় সংক্ষুব্ধতার জন্ম হয়েছে।</p>
              <small style={{ fontSize: '10px' }} className="text-gray-400 hover:text-gray-500">১ ঘণ্টা আগে</small>
            </div>
          </div>

        </div>

        {/* Right one */}
        <div className="gap-y-4">
          <div className="border-b border-gray-400 pb-2">
            <div className="flex">
              <h1 style={{ fontSize: '14px' }} className="font-semibold w-50">বিশেষ সাক্ষাৎকার: পর্ব ২ মাহফুজ আলম ‘মানুষ নতুন একটা রাজনৈতিক পরিসর খুঁজছে’</h1>
              <Image
                src='https://images.prothomalo.com/prothomalo-bangla%2F2024-10-03%2Fe6qeuih9%2F080031ZKS6082071727.jpg?rect=0%2C0%2C2550%2C1700&auto=format%2Ccompress&fmt=webp&format=webp&w=100&dpr=1.0'
                alt='Prothom alo home icon'
                width={1000}
                height={450}
                className="w-28 h-16"
              />
            </div>
            <p style={{ fontSize: '12px' }}>বাংলাদেশে যত ধরনের ইসলামপন্থী চিন্তাধারা আছে, গত ৫০ বছর তাদের সঙ্গে কোনো সংলাপ না হওয়ায় সংক্ষুব্ধতার জন্ম হয়েছে।</p>
            <small style={{ fontSize: '10px' }} className="text-gray-400 hover:text-gray-500">১ ঘণ্টা আগে</small>
          </div>


          <div className="border-b border-gray-400 py-2">
            <div className="flex">
              <h1 style={{ fontSize: '14px' }} className="font-semibold w-50">বিশেষ সাক্ষাৎকার: পর্ব ২ মাহফুজ আলম ‘মানুষ নতুন একটা রাজনৈতিক পরিসর খুঁজছে’</h1>
              <Image
                src='https://images.prothomalo.com/prothomalo-bangla%2F2024-10-03%2Fe6qeuih9%2F080031ZKS6082071727.jpg?rect=0%2C0%2C2550%2C1700&auto=format%2Ccompress&fmt=webp&format=webp&w=100&dpr=1.0'
                alt='Prothom alo home icon'
                width={1000}
                height={450}
                className="w-28 h-16"
              />
            </div>
            <p style={{ fontSize: '12px' }}>বাংলাদেশে যত ধরনের ইসলামপন্থী চিন্তাধারা আছে, গত ৫০ বছর তাদের সঙ্গে কোনো সংলাপ না হওয়ায় সংক্ষুব্ধতার জন্ম হয়েছে।</p>
            <small style={{ fontSize: '10px' }} className="text-gray-400 hover:text-gray-500">১ ঘণ্টা আগে</small>
          </div>


          <div className="pt-2">
            <div className="flex">
              <h1 style={{ fontSize: '14px' }} className="font-semibold w-50">বিশেষ সাক্ষাৎকার: পর্ব ২ মাহফুজ আলম ‘মানুষ নতুন একটা রাজনৈতিক পরিসর খুঁজছে’</h1>
              <Image
                src='https://images.prothomalo.com/prothomalo-bangla%2F2024-10-03%2Fe6qeuih9%2F080031ZKS6082071727.jpg?rect=0%2C0%2C2550%2C1700&auto=format%2Ccompress&fmt=webp&format=webp&w=100&dpr=1.0'
                alt='Prothom alo home icon'
                width={1000}
                height={450}
                className="w-28 h-16"
              />
            </div>
            <p style={{ fontSize: '12px' }}>বাংলাদেশে যত ধরনের ইসলামপন্থী চিন্তাধারা আছে, গত ৫০ বছর তাদের সঙ্গে কোনো সংলাপ না হওয়ায় সংক্ষুব্ধতার জন্ম হয়েছে।</p>
            <small style={{ fontSize: '10px' }} className="text-gray-400 hover:text-gray-500">১ ঘণ্টা আগে</small>
          </div>
        </div>

      </div>
      {/* The home card */}
      <div>
        <HomeCard></HomeCard>
      </div>


      {/* Long divider */}
      <div className="my-24">
        <div className="h-[5px] w-full bg-gray-300"></div>
      </div>


      {/* Apnader jonno */}
      <div className="mb-6">
        <div className="flex items-center gap-x-4 mb-4 hover:text-blue-500 transition duration-300 hover:cursor-pointer">
        <h1 className="text-2xl">আপনার জন্য</h1>
        <MdKeyboardArrowRight size={30}></MdKeyboardArrowRight>
        </div>
        <ApnaderJonno></ApnaderJonno>
      </div>



    </div>
  );
}
