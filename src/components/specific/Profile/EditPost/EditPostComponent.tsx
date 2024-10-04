"use client";

import { fetchPostBySlug } from "@/lib/postApi";
import { useLoggedInUserQuery } from "@/redux/api/authApi";
import { useUpdatePostMutation } from "@/redux/api/postApi";
import { Category } from "@/types/categoryType";
import { User } from "@/types/userType";
import { getIdFromToken } from "@/utils/getIdFromToken";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "suneditor/dist/css/suneditor.min.css";
import noimg from "../../../../../public/images/no-image.jpg";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const EditPostComponent = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const decodedslug = decodeURIComponent(slug || "");
  const router = useRouter();

  // get user
  const id = getIdFromToken();
  const { data } = useLoggedInUserQuery(id!);
  const user: User = data || {};

  //  states
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      const getPostById = async () => {
        const data = await fetchPostBySlug(decodeURIComponent(slug));

        if (data) {
          setTitle(data?.title ?? "");
          setCategoryId(data?.categoryId?.toString() ?? "");
          setSubCategoryId(data?.subCategoryId?.toString() ?? "");
          setContent(data?.content ?? "");
          setImage(data?.thumbnail ?? "");
        }
      };

      getPostById();
      setLoading(false);
    }

    return () => {};
  }, [slug]);

  // redux func
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !categoryId || !content || !user) {
      toast.error("Please fill all fields");
      return () => {};
    }

    const formData = new FormData();
    formData.append("title", title);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    formData.append("categoryId", categoryId);
    if (subCategoryId) formData.append("subCategoryId", subCategoryId);
    formData.append("description", content);
    formData.append("authorId", user?.id.toString());

    // Log the FormData object
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    try {
      const res = await updatePost({ decodedslug, formData }).unwrap();
      console.log(res);
      toast.success("Post updated successfully");

      router.push(`/my-posts`);
    } catch (error) {
      console.log("Error adding post", error);
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
          Update Post
        </h3>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Post Title
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
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Post Thumbnail{" "}
            <span className="text-xs text-yellow-500">( optional )</span>
          </label>
          <input
            id="thumbnail"
            className="input_file w-full border rounded-md py-2 px-4"
            type="file"
            name="thumbnail"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          />

          {(image || thumbnail) && (
            <Image
              src={thumbnail ? URL.createObjectURL(thumbnail) : image}
              alt="thumbnail"
              width={200}
              height={200}
              className="mt-3 rounded-md"
            />
          )}
        </div>

        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Category
          </label>
          <select
            className="input px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            name="categoryId"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories
              ?.filter((c) => c?.parentId === null)
              ?.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Sub Category{" "}
            <span className="text-xs text-yellow-500">( optional )</span>
          </label>
          <select
            className="overflow-auto input px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            name="categoryId"
            id="categoryId"
            value={subCategoryId}
            onChange={(e) => setSubCategoryId(e.target.value)}
          >
            <option value="">Select Sub Category</option>
            {categories
              ?.filter((c) => c?.parentId === Number(categoryId))
              ?.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Post Description
          </label>
          <SunEditor
            setContents={content}
            onChange={setContent}
            setOptions={{
              defaultStyle:
                "font-size: 16px; font-family: arial; font-weight: normal;",
              buttonList: [
                ["fontSize", "formatBlock"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["align", "horizontalRule", "list", "table"],
                ["fontColor", "hiliteColor"],
                ["outdent", "indent"],
                ["link", "image", "video"],
                ["preview", "print"],
                ["fullScreen", "showBlocks", "codeView"],
              ],
            }}
            height="400px"
            placeholder="Post Description"
          />
        </div>

        <button
          type="submit"
          className="btn bg-secondary text-white w-full py-2 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          {isLoading ? "Loading..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPostComponent;
