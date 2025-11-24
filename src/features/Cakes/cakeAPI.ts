import { ApiUrl } from "../../utils/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export type Tcakes = {
  cakeId: number;
  cakeName: string;
  flavorsUsed: string;
  size: string;
  price: number;
  imageURL: string;
  quantityAvailable: number;
  isactive: boolean;
  createdAt: string;
  updatedAt: string;
};
const cakeApi = createApi({
  reducerPath: "cakeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: ["Cakes"],
  endpoints: (builder) => ({
    getCakes: builder.query<{ data: Tcakes[] }, void>({
      query: () => ({
        url: "/readycakes",
        method: "GET",
      }),
      providesTags: ["Cakes"],
    }),
  }),
});

export const { useGetCakesQuery } = cakeApi;

export default cakeApi;
