import SignInPage from "@/components/specific/Signin/SignInPage";
import Loader from "@/components/ui/Loader";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignIn = () => {
  return (
    <div className="custom_container">
      <Suspense fallback={<Loader />}>
        <SignInPage />
      </Suspense>
    </div>
  );
};

export default SignIn;
