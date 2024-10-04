"use client";

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
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsByVideoIdQuery,
  useGetCommentsQuery,
  useGetSingleCommentQuery,
  useUpdateCommentMutation,
} from "@/redux/api/commentApi";
import { currentDate } from "@/utils/currentDate";
import { getIdFromToken } from "@/utils/getIdFromToken";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

export default function VideoComment({ id }: { id: number }) {
  const userId = getIdFromToken() || 0;
  const [content, setContent] = useState("");
  const [commentsToShow, setCommentsToShow] = useState(5); 
  // comment
  const { data, isLoading } = useGetCommentsByVideoIdQuery(id);
  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();

  const [deleteComment, { isLoading: isDeletingComment }] =
    useDeleteCommentMutation();

  const [updateContent, setUpdateContent] = useState("");

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content) {
      toast.error("Content cannot be empty");
      return () => {};
    }

    if (!userId) {
      toast.error("Please login to comment");
      return () => {};
    }

    const data = {
      videoId: id,
      userId,
      content,
    };

    const res = await addComment(data).unwrap();
    if (res) {
      setContent("");
    }
    toast.success("Comment added successfully");
  };

  const [updateComment, { isLoading: isUpdatingComment }] =
    useUpdateCommentMutation();

  const handleUpdateComment = async (id: number) => {
    if (!updateContent) {
      toast.error("Content cannot be empty");
      return () => {};
    }

    const data = {
      content: updateContent,
      userId,
    };

    try {
      const res = await updateComment({ id, data }).unwrap();
      if (res) {
        toast.success("Comment updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update comment");
    }
  };

  const handleLoadMoreComments = () => {
    setCommentsToShow((prev) => prev + 5); // Increase the number of comments shown by 5
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="pt-10">
      <div className="flex items-center gap-2">
        <div className="border-l-4 h-8 border-secondary"></div>
        <h1 className="text-xl font-bold text-secondary">মন্তব্য করুন</h1>
      </div>
      <div className="border border-gray-300 my-3 rounded-md">
        <form className="p-2" onSubmit={handleAddComment}>
          <div className="flex flex-col gap-2">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="মন্তব্য"
              className="border border-gray-300 rounded-md p-2
                      focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent
                      "
            ></textarea>
            <button
              disabled={isAddingComment}
              type="submit"
              className="bg-secondary hover:bg-primary text-white py-2 rounded-md"
            >
              {isAddingComment ? "Loading..." : "মন্তব্য করুন"}
            </button>
          </div>
        </form>
        <div className="divide-y">
          {data?.comments?.slice(0, commentsToShow).map((comment: any) => (
            <div key={comment?.id} className="px-2 py-5 font-solayman">
              <div className="flex items-center gap-2 relative">
                <div className="h-10 w-10 rounded-full">
                  <Image
                    src={comment?.user?.picture}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="text-base font-semibold">
                    {comment?.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {comment?.createdAt &&
                      new Date(comment?.createdAt).toLocaleString("bn-BD", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </p>
                </div>

                {/* action */}
                <div>
                  {userId === comment?.userId && (
                    <div className="absolute right-2 top-1 space-x-2">
                      {/* edit */}
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <FaRegEdit className="text-secondary" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-english text-center">
                              Edit Comment
                            </AlertDialogTitle>
                            <AlertDialogDescription className="font-english">
                              <form
                                className="p-2"
                                onSubmit={(e) => e.preventDefault()}
                              >
                                <div className="flex flex-col gap-2">
                                  <textarea
                                    onChange={(e) =>
                                      setUpdateContent(e.target.value)
                                    }
                                    value={updateContent || comment?.content}
                                    placeholder="মন্তব্য"
                                    className="border border-gray-300 rounded-md p-2
                      focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent
                      "
                                  ></textarea>
                                </div>
                              </form>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleUpdateComment(comment?.id)}
                              className="text-white"
                            >
                              {isUpdatingComment ? "Loading..." : "Update"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      {/* delete */}
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <AiOutlineDelete className="text-primary" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-english">
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="font-english">
                              This action cannot be undone. This will
                              permanently delete your comment.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => {
                                await deleteComment({
                                  id: comment?.id,
                                  userId,
                                }).unwrap();
                                toast.success("মন্তব্য মুছে ফেলা হয়েছে");
                              }}
                              className="text-white"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-justify mt-2">
                <p className="text-lg">{comment?.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {data?.comments?.length > commentsToShow && (
        <button
          onClick={handleLoadMoreComments}
          className="bg-secondary hover:bg-primary text-white py-2 rounded-md mt-3 mx-auto block px-4 text-xs font-solayman"
        >
          আরো দেখুন
        </button>
      )}
    </div>
  );
}
