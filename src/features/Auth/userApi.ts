import { ApiUrl } from "../../utils/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Tuser = {
  user_id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiUrl,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation<Tuser, Partial<Tuser>>({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    verifyUser: builder.mutation<
      { message: string },
      { email: string; verification_code: string }
    >({
      query: (body) => ({
        url: "/users/verify",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useCreateUserMutation, useVerifyUserMutation } = userApi;
export default userApi;
