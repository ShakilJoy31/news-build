"use client";

import { useSignInMutation } from "@/redux/api/authApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaPhone,
} from "react-icons/fa";
import { toast } from "react-toastify";
import logoIcon from "../../../../public/icons/key.png";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [signIn, { isLoading }] = useSignInMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);

    // console.log(formData);
    try {
      const response = await signIn(formData);

      const { access_token, user } = response?.data;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Account login successfully");
        router.push(redirect || "/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="py-16">
      <div className="flex-1">
        <div className="flex flex-wrap">
          <div className="w-full max-w-[600px] mx-auto py-10 px-5 bg-gray-100 shadow-md rounded-md">
            <div className="px-4 my-7">
              <div className="flex items-center justify-center gap-3">
                <Image src={logoIcon} alt="Register" width={50} height={50} />
                <h3 className="text-3xl font-bold uppercase mt-2">Login</h3>
              </div>
              <br />
              <br />
              {authError && (
                <p className="text-red-500 font-medium mb-4 text-center">
                  <FaExclamationTriangle className="inline mr-2" />
                  {authError}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block font-medium">
                    Email
                  </label>
                  <div className="relative mt-1">
                    <FaPhone className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full py-4 pl-14 pr-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Email/Phone"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block font-medium">
                    Enter New Password
                  </label>
                  <div className="relative mt-1">
                    <FaKey className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="w-full py-4 pl-14 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="New Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  className="w-full py-3 bg-secondary text-white font-semibold rounded hover:bg-primary transition-colors duration-300 ease-in-out"
                  type="submit"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
                <div className="text-sm text-gray-700 dark:text-gray-400 mt-4 flex items-center justify-center gap-3">
                  <p>Don&rsquo;t have an account?</p>
                  <Link
                    href="/signup"
                    className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                  >
                    Register here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
