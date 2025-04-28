import { apiSlice } from "@/redux/services/api-slice";

export const api = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: (search) => ({
        url: `/companies`,
        params: {
          search,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({
                type: "Companies",
                id,
              })),
              { type: "Companies", id: "LIST" },
            ]
          : [{ type: "Companies", id: "LIST" }],
    }),
    createCompany: builder.mutation({
      query: (body) => ({
        url: "/companies",
        method: "POST",
        body,
        // credentials: 'include',
      }),
      invalidatesTags: [{ type: "Companies", id: "LIST" }],
    }),
    getCompany: builder.query({
      query: (id) => ({ url: `/companies/${id}` }),
      providesTags: (result, error, id) => [{ type: "Companies", id }],
    }),
    updateCompany: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/companies/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Companies", id }],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
        // credentials: 'include'
      }),
      invalidatesTags: (result, error, id) => [{ type: "Companies", id }],
    }),
    deleteCompanyLogo: builder.mutation({
      query: (publicId) => ({
        url: `/companies/logo/${publicId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Companies", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useGetCompanyQuery,
  useLazyGetCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useDeleteCompanyLogoMutation,
} = api;
