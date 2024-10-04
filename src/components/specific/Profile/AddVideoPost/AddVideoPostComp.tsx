"use client";

import { useLoggedInUserQuery } from "@/redux/api/authApi";
import { useAddVideoPostMutation } from "@/redux/api/postApi";
import { User } from "@/types/userType";
import { getIdFromToken } from "@/utils/getIdFromToken";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AddVideoPostForm = () => {
  const router = useRouter();
  // get user
  const id = getIdFromToken();
  const { data } = useLoggedInUserQuery(id!);
  const user: User = data || {};

  //  states
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  // redux func
  const [addVideoPost, { isLoading }] = useAddVideoPostMutation();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !link || !user) {
      toast.error("Please fill all fields");
      return () => {};
    }

    const body = {
      title,
      link,
      authorId: user.id,
    };

    try {
      const res = await addVideoPost(body).unwrap();
      // console.log(res);
      toast.success("Video Post added successfully");
      setTitle("");
      setLink("");
      router.push(`/my-video-posts`);
    } catch (error) {
      console.log("Error adding video post", error);
    }
  };

  return (
    <div className="bg-white text-gray-800 shadow-md border border-gray-100 w-full rounded-md  p-5">
      <form
        id="addNewForm"
        className="space-y-6"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <h3 className="col-span-full text-center text-2xl font-semibold uppercase text-secondary">
          Add Video
        </h3>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Video Title
          </label>
          <input
            id="title"
            type="text"
            className="input py-2 px-4 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            name="title"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Video Link
          </label>
          <input
            id="title"
            type="text"
            className="input py-2 px-4 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            name="title"
            placeholder="https://youtu.be/djcd9N8tbf8?si=WHrAX6ZRgbATAXXZ"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <input type="hidden" value={user?.id} name="authorId" />

        <button
          type="submit"
          className="btn bg-secondary text-white w-full py-2 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          {isLoading ? "Loading..." : "Add Video Post"}
        </button>
      </form>
    </div>
  );
};

export default AddVideoPostForm;
