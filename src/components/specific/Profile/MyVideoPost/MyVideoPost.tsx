"use client";

import { fetchAllPosts } from "@/lib/postApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Loader from "@/components/ui/Loader";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useDeleteVideoPostMutation,
  useGetVideoPostsQuery,
} from "@/redux/api/postApi";
import { getIdFromToken } from "@/utils/getIdFromToken";
import { toast } from "react-toastify";
import VideoImage from "./VideoImage";

const MyVideoPost = () => {
  const id = getIdFromToken() || 0;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  // delete post
  const [deleteVideoPost, { isLoading }] = useDeleteVideoPostMutation();
  const { data, isLoading: getLoading } = useGetVideoPostsQuery({});

  useEffect(() => {
    if (data && data?.videoPosts && !getLoading) {
      const postById = data?.videoPosts.filter(
        (post: any) => post?.authorId === id
      );
      setPosts(postById);
      setTotalPosts(postById?.length);
    }
  }, [data, getLoading, id]);

  const totalPages = Math.ceil(totalPosts / limit);

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
    setPage(1); // Reset page to 1 when limit changes
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const paginatedPosts = posts.slice((page - 1) * limit, page * limit);

  return (
    <>
      <div className="bg-white text-gray-800 shadow-md border border-gray-100 w-full rounded-md overflow-auto">
        <h2 className="px-6 py-4 pb-4 border-b text-center text-2xl font-semibold uppercase text-secondary">
          My Videos
        </h2>
        <div className="flex flex-wrap items-center justify-between px-4 py-2 border-b">
          <div className="flex items-center pl-3">
            <p className="text-xs text-gray-400">Show</p>
            <div className="px-2 py-2 text-xs text-gray-500">
              <select
                name="entries"
                id="entries"
                className="block text-base bg-gray-100 cursor-pointer w-11 dark:text-gray-400 dark:bg-gray-700"
                value={limit}
                onChange={handleEntriesChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <p className="text-xs text-gray-400">entries</p>
          </div>
          {/* <div className="relative">
            <input
              type="text"
              className="input pl-8 pr-4 py-2 rounded w-full bg-gray-100 focus:outline-none"
              placeholder="Search..."
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div> */}
        </div>

        {getLoading ? (
          <div className="my-10">
            <Loader />
          </div>
        ) : posts?.length === 0 ? (
          <div className="my-10 text-center text-gray-500">No data</div>
        ) : (
          <table className="w-full overflow-auto">
            <thead className="bg-gray-50">
              <tr className="text-xs text-left text-gray-900 border-b bg-gray-200">
                <th className="px-6 py-3 font-medium dark:text-gray-400 whitespace-nowrap">
                  Thumbnail
                </th>
                <th className="px-6 py-3 font-medium dark:text-gray-400 whitespace-nowrap">
                  Title
                </th>
                <th className="px-6 py-3 font-medium dark:text-gray-400 whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-3 font-medium dark:text-gray-400 whitespace-nowrap text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts?.map((post: any) => (
                <tr key={post?.id} className="border-b bg-white">
                  <td
                    data-ripple-dark="true"
                    className="px-6 text-sm font-medium dark:text-gray-400 min-w-[210px] w- lg:min-w-[300px] lg:w-[300px]"
                  >
                    <Link
                      href={`/ভিডিও/video?slug=${post.slug}`}
                      target="_blank"
                      className="flex gap-2 py-4 items-center banglaFont"
                    >
                      <VideoImage
                        link={post?.link || ""}
                        title={post?.title || ""}
                      />
                    </Link>
                  </td>
                  <td
                    data-ripple-dark="true"
                    className="px-6 text-sm font-medium dark:text-gray-400"
                  >
                    <Link href={`/ভিডিও/video?slug=${post.slug}`}>
                      {post?.title && post?.title?.length > 50
                        ? post?.title?.slice(0, 50) + "..."
                        : post?.title}
                    </Link>
                  </td>
                  <td className="px-6 text-sm font-semibold dark:text-gray-400">
                    <span
                      className={`  ${
                        post?.status === "approved"
                          ? "text-green-500"
                          : post?.status === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {post?.status}
                    </span>
                  </td>
                  <td className="">
                    <div className="flex gap-1 items-center justify-center">
                      <Link
                        href={`/my-video-posts/edit-video-post?id=${post?.id}`}
                      >
                        <FaEdit className="text-secondary h-4 w-4" />
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger>
                          <MdDelete className="text-primary h-[17px] w-[17px] cursor-pointer" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-english">
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="font-english">
                              This action cannot be undone. This will
                              permanently delete your post.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => {
                                await deleteVideoPost(post?.id).unwrap();
                                toast.success("Post deleted!");
                              }}
                              className="text-white"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {totalPosts > 0 && (
          <div className="flex flex-wrap items-center justify-between px-6 py-3">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                    className={`cursor-pointer ${
                      page === 1 ? "cursor-not-allowed" : ""
                    }`}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={page === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    className={`cursor-pointer ${
                      page === totalPages ? "cursor-not-allowed" : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default MyVideoPost;
