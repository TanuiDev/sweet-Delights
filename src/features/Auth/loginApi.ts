import { ApiUrl } from "../../utils/apiUrl";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export type TloginResponse = {
  token: string;
  user: {
    user_id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
  };
};
export type loginInput = {
  email: string;
  password: string;
};

const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiUrl,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<TloginResponse, loginInput>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
export default loginApi;
