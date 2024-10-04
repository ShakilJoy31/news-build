import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      query: (slug) => ({
        url: `/category/subcategory/parentId/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSubCategoriesQuery } = categoryApi;
