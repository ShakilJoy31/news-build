'use client'

import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import img from "../../../../../public/images/image-100370-1719808577.webp";
import { Progress } from "@/components/ui/progress";

const OnlineJorip = () => {
  const [progress, setProgress] = useState(35);
  const [progress_1, setProgress_1] = useState(100-progress);
  return (
    <div className="mt-5 border border-gray-300 p-2 rounded-md banglaFont">
      {/* <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <FaRegClock />
          <p className="text-xs font-english">30 June, 2024 | 02.26pm</p>
        </div>
        <FaDownload className="cursor-pointer" />
      </div> */}

      <div className="mt-3 rounded-md">
        <Image
          src={img}
          alt="online-jorip"
          height={300}
          width={400}
          className="w-full rounded-md"
        />
        <h1 className="text-lg font-semibold leading-6 mt-3">
          ভারত ও দক্ষিণ আফ্রিকার ম্যাচে ডেভিড মিলারের আউট নিয়ে অনেকে আপত্তি
          তুলছেন। আপনি কী মনে করেন?
        </h1>

        {/* <div className="mt-5">
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="r2" />
              <Progress
                text="আউট সঠিক ছিল"
                value={progress}
                className="w-full bg-gray-300 h-7 rounded-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="r3" />
              <Progress
                text="সঠিক ছিল না"
                value={progress_1}
                className="w-full bg-gray-300 h-7 rounded-md"
              />
            </div>
          </RadioGroup>
          <p className="mt-3 text-sm text-center">মোট ভোটদাতাঃ ৩,৯০৫ জন</p>
        </div> */}
      </div>
    </div>
  );
};

export default OnlineJorip;
