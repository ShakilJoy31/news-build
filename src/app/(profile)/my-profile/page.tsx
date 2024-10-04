import MyProfilePage from "@/components/specific/Profile/MyProfile/MyProfilePage";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

const MyProfile = () => {
  return (
    <div className="my-10 md:min-h-[calc(100vh-20rem)] min-h-[calc(100vh-15rem)]">
      <MyProfilePage />
    </div>
  );
};

export default MyProfile;
