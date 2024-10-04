"use client";

import {
  useGetVideoPostByIdQuery,
  useUpdateVideoPostMutation,
} from "@/redux/api/postApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditVideoPostForm = () => {
  //  states
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data } = useGetVideoPostByIdQuery(Number(id));
  const [updateVideoPost, { isLoading }] = useUpdateVideoPostMutation();

  // redux functions
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !link) {
      toast.error("Please fill all fields");
      return () => {};
    }

    const body = {
      title,
      link,
    };

    try {
      const res = await updateVideoPost({ id, body }).unwrap();
      console.log(res);
      toast.success("Video Post updated successfully");
      router.push(`/my-video-posts`);
    } catch (error) {
      console.log("Error adding video post", error);
    }
  };

  useEffect(() => {
    if (data) {
      setTitle(data?.videoPost?.title);
      setLink(data?.videoPost?.link);
    }
  }, [data]);

  return (
    <div className="bg-white text-gray-800 shadow-md border border-gray-100 w-full rounded-md  p-5">
      <form
        id="addNewForm"
        className="space-y-6"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <h3 className="col-span-full text-center text-2xl font-semibold uppercase text-secondary">
          Update Video Post
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
            placeholder="Post Title"
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
            placeholder="Post Title"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn bg-secondary text-white w-full py-2 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          {isLoading ? "Loading..." : "Update Video Post"}
        </button>
      </form>
    </div>
  );
};

export default EditVideoPostForm;
