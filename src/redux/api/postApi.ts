import { baseApi } from "./baseApi";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewPost: builder.mutation({
      query: (formData) => ({
        url: `/post/add-new-post`,
        method: "POST",
        data: formData,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation({
      query: ({ decodedslug, formData }) => ({
        url: `/post/update-post/${decodedslug}`,
        method: "PUT",
        data: formData,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["posts"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/delete-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),

    favouritePosts: builder.query({
      query: () => ({
        url: "/post/top-views",
        method: "GET",
      }),
      providesTags: ["posts"],
    }),

    getAllPosts: builder.query({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
      providesTags: ["posts"],
    }),

    gelAllPostsByAuthor: builder.query({
      query: (author) => ({
        url: `/post/author/${author}`,
        method: "GET",
      }),
      providesTags: ["posts"],
    }),

    // video post ----------------------------

    addVideoPost: builder.mutation({
      query: (body) => ({
        url: `/video-post/add-video-post`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["videoposts"],
    }),

    getVideoPosts: builder.query({
      query: () => ({
        url: "/video-post",
        method: "GET",
      }),
      providesTags: ["videoposts"],
    }),

    updateVideoPost: builder.mutation({
      query: ({ id, body }) => ({
        url: `/video-post/update-video-post/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["videoposts"],
    }),

    deleteVideoPost: builder.mutation({
      query: (id) => ({
        url: `/video-post/delete-video-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videoposts"],
    }),

    getVideoPostById: builder.query({
      query: (id) => ({
        url: `/video-post/${id}`,
        method: "GET",
      }),
    }),

    getVideoPostBySlug: builder.query({
      query: (slug) => ({
        url: `/video-post/get-by-slug/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddNewPostMutation,
  useFavouritePostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useAddVideoPostMutation,
  useGetVideoPostsQuery,
  useUpdateVideoPostMutation,
  useDeleteVideoPostMutation,
  useGetVideoPostByIdQuery,
  useGetVideoPostBySlugQuery,
  useGelAllPostsByAuthorQuery,
} = postApi;
