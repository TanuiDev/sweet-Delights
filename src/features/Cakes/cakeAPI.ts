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
    getCakeById: builder.query<{ data: Tcakes }, number>({
      query: (cakeId) => ({
        url: `/readycakes/${cakeId}`,
        method: "GET",
      }),
      providesTags: ["Cakes"],
    }),
    // getCakeByUserId: builder.query<{ data: Tcakes[] }, number>({
    //   query: (user_Id) => ({
    //     url: `/readycakes/user/${user_Id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Cakes"],
    // }),
    addCake: builder.mutation<{ data: Tcakes }, Partial<Tcakes>>({
      query: (cake) => ({
        url: "/readycakes",
        method: "POST",
        body: cake,
      }),
      invalidatesTags: ["Cakes"],
    }),
    updateCake: builder.mutation<{ data: Tcakes }, Partial<Tcakes>>({
      query: (cake) => ({
        url: `/readycakes/${cake.cakeId}`,
        method: "PUT",
        body: cake,
      }),
      invalidatesTags: ["Cakes"],
    }),
    deleteCake: builder.mutation<{ success: boolean; cakeId: number }, number>({
      query: (cakeId) => ({
        url: `/readycakes/${cakeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cakes"],
    }),
  }),
});

export const {
  useGetCakesQuery,
  useAddCakeMutation,
  useUpdateCakeMutation,
  useDeleteCakeMutation,
  useGetCakeByIdQuery,
  // useGetCakeByUserIdQuery,
} = cakeApi;

export default cakeApi;
