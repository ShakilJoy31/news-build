import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loggedInUser: builder.query({
      query: (id: number) => ({
        url: `/auth/logged-user/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    changePassword: builder.mutation({
      query: ({ id, old_password, new_password }) => ({
        url: `/auth/change-password?id=${id}`,
        method: "POST",
        data: { old_password, new_password },
      }),
      invalidatesTags: ["users"],
    }),
    signIn: builder.mutation({
      query: (formData) => ({
        url: `/auth/login`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["users"],
    }),
    signUp: builder.mutation({
      query: (formData) => ({
        url: `/auth/signup`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoggedInUserQuery,
  useChangePasswordMutation,
  useSignInMutation,
  useSignUpMutation
} = authApi;
