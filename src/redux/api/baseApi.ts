import { axiosBaseQuery } from "@/utils/axios/customBaseQuery";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  // baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: ["users", "posts", "comments", 'videoposts'],
});
