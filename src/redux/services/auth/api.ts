import { apiSlice } from "@/redux/services/api-slice";

export const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/auth/profile",
    }),
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/admin-login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useAdminLoginMutation,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = api;
