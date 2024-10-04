"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  allDivision,
  districtsOf,
  DivisonName,
  upazilasOf,
} from "@bangladeshi/bangladesh-address";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchByArea() {
  const router = useRouter();

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState<
    { upazila: string; district: string; division: string }[]
  >([]);

  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<null | string>(null);
  const [selectedUpazila, setSelectedUpazila] = useState<null | string>(null);

  useEffect(() => {
    const divisions = allDivision();
    setDivisions(divisions);
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      const districts = districtsOf(selectedDivision as DivisonName);
      setDistricts(districts);
      setSelectedDistrict(null); // Reset the district selection when division changes
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      const upazilas = upazilasOf(selectedDistrict);
      setUpazilas(upazilas);
      setSelectedUpazila(null); // Reset the upazila selection when district changes
    }
  }, [selectedDistrict]);

  const handleSearch = () => {
    // if (selectedDivision && selectedDistrict && selectedUpazila) {
    //   router.push(
    //     `/saradesh/${selectedDivision}/${selectedDistrict}/${selectedUpazila}`
    //   );
    // }

    console.log(selectedDivision, selectedDistrict, selectedUpazila);
  };

  return (
    <div className="border border-gray-300 rounded-md h-fit p-2 space-y-3 font-solayman">
      <Select onValueChange={(value) => setSelectedDivision(value)}>
        <SelectTrigger className="">
          <SelectValue placeholder="বিভাগ" />
        </SelectTrigger>
        <SelectContent>
          {divisions.map((division) => (
            <SelectItem
              className="font-english"
              key={division}
              value={division}
            >
              {division}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => setSelectedDistrict(value)}
        disabled={!selectedDivision}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="জেলা" />
        </SelectTrigger>
        <SelectContent>
          {districts.map((district) => (
            <SelectItem
              className="font-english"
              key={district}
              value={district}
            >
              {district}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => setSelectedUpazila(value)}
        disabled={!selectedDistrict}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="উপজেলা" />
        </SelectTrigger>
        <SelectContent>
          {upazilas.map((upazila) => (
            <SelectItem
              className="font-english"
              key={upazila.upazila}
              value={upazila.upazila}
            >
              {upazila.upazila}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={handleSearch}
        className="w-full bg-secondary text-white font-solayman text-lg leading-loose"
      >
        খুজুন
      </Button>
    </div>
  );
}
