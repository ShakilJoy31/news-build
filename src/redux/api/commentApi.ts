import { baseApi } from "./baseApi";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId: number) => ({
        url: `/comments/get-comments/${postId}`,
        method: "GET",
      }),
      providesTags: ["comments"],
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `/comments/add-comment`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["comments"],
    }),
    updateComment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/comments/update-comment/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["comments"],
    }),
    deleteComment: builder.mutation({
      query: ({ userId, id }) => ({
        url: `/comments/delete-comment/${id}`,
        method: "DELETE",
        data: { userId },
      }),
      invalidatesTags: ["comments"],
    }),
    getSingleComment: builder.query({
      query: (id: number) => ({
        url: `/comments/get-single-comment/${id}`,
        method: "GET",
      }),
    }),
    getAllComments: builder.query({
      query: () => ({
        url: `/comments`,
        method: "GET",
      }),
    }),

    getCommentsByVideoId: builder.query({
      query: (videoId: number) => ({
        url: `/comments/get-comment-videoid/${videoId}`,
        method: "GET",
      }),
      providesTags: ["comments"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetSingleCommentQuery,
  useGetAllCommentsQuery,
  useGetCommentsByVideoIdQuery,
} = commentApi;
