"use client";

import { useLoggedInUserQuery } from "@/redux/api/authApi";
import { User } from "@/types/userType";
import { getIdFromToken } from "@/utils/getIdFromToken";
import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const MyProfilePage = () => {
  const id = getIdFromToken();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { data } = useLoggedInUserQuery(id!);
  const user: User = useMemo(() => data || {}, [data]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    picture: "",
    city: "",
    address: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (user && user.id) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        picture: user.picture || "",
        city: user.city || "",
        address: user.address || "",
      });
    }

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      setToken(token);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files) {
      setFile(files[0]);
      setFormData({ ...formData, picture: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Create form data
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("address", formData.address);

    if (file) {
      formDataToSend.append("picture", file);
    }

    // Update user profile
    try {
      if (!token) {
        throw new Error("No access token found");
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-user/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully");
      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error("Failed to update profile");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 shadow-md border border-gray-100 w-full rounded-md ">
      <div className="p-5">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <h3 className="col-span-full text-center text-2xl font-semibold uppercase text-secondary">
            Update Information
          </h3>
          <div className="col-span-full">
            <label htmlFor="name" className="block font-medium text-sm mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="input p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium text-sm mb-1">
              Phone/Mobile
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="input p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Your Phone/Mobile"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="picture" className="block font-medium text-sm mb-1">
              Change Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              {formData.picture && (
                <Image
                  src={formData.picture}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <input
                className="input p-1 w-full border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                aria-describedby="picture"
                name="picture"
                id="picture"
                type="file"
                onChange={handleChange}
              />
            </div>
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="picture"
            >
              A profile picture is useful to confirm you are logged into your
              account
            </p>
          </div>

          <button
            type="submit"
            className="btn rounded-md col-span-full py-3 bg-secondary hover:bg-primary text-white w-full"
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfilePage;
