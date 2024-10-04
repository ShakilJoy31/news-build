import SignUpPage from "@/components/specific/Signup/SignUpPage";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUp = () => {
  return (
    <>
      <div className="custom_container">
        <SignUpPage />
      </div>
    </>
  );
};

export default SignUp;
