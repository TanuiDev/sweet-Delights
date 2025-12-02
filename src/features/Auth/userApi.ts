import { ApiUrl } from "../../utils/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export type Tuser = {
  user_Id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  Created_At: string;
  Updated_At: string;
  is_verified: boolean;
};

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }
      return;
    },
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
      { email: string; code: string }
    >({
      query: (body) => ({
        url: "/users/verify",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query<{ data: Tuser[] }, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUsersById: builder.query<Tuser, number>({
      query: (user_Id) => ({
        url: `/users/${user_Id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<Tuser, Partial<Tuser> & { user_Id: number }>({
      query: (user) => ({
        url: `/users/${user.user_Id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<{ success: boolean; user_Id: number }, number>(
      {
        query: (user_Id) => ({
          url: `/users/${user_Id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["User"],
      },
    ),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useGetUsersQuery,
  useGetUsersByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
export default userApi;
