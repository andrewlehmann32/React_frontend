// Imports:
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "../../config/environment";

// User API:
export const userAPI = createApi({
  reducerPath: "User",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    Google: builder.mutation({
      query: ({ user, token }: { user: object; token: string }) => ({
        url: "/user/google",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          user,
        },
      }),
    }),

    Register: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: "/user/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email, password },
      }),
    }),

    Login: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: "/user/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { email, password },
      }),
    }),
  }),
});

export const { useGoogleMutation, useRegisterMutation, useLoginMutation } =
  userAPI;
