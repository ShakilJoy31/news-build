import ChangePasswordForm from "@/components/specific/Profile/ChangePassword/ChangePasswordPage";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
};

const ChangePassword = () => {
  return (
    <div
     className="my-10 md:min-h-[calc(100vh-20rem)] min-h-[calc(100vh-15rem)]"
    >
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePassword;
