import { ApiUrl } from "../../utils/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export type Torders = {
  Id: number;
  UserId: number;
  DesignId?: number;
  Size: string;
  Flavor: string;
  Message: string;
  Status: string;
  DeliveryDate: string;
  Price: number;
  Notes: string;
  ExtendedDescription: string;
  SampleImages: string[];
  ColorPreferences: string;
  CreatedAt: string;
  UpdatedAt: string;
};

const orderApi = createApi({
  reducerPath: "orderApi",
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
    createOrder: builder.mutation<Torders, Partial<Torders>>({
      query: (body) => ({
        url: "/orders/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    getOrders: builder.query<{ data: Torders[] }, void>({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getOrderByUserId: builder.query<{ data: Torders[] }, number>({
      query: (userId) => ({
        url: `/user/orders/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateOrder: builder.mutation<Torders, Partial<Torders> & { Id: number }>({
      query: (order) => ({
        url: `/orders/${order.Id}`,
        method: "PUT",
        body: order,
      }),
      invalidatesTags: ["User"],
    }),
    deleteOrder: builder.mutation<
      { success: boolean; order_Id: number },
      number
    >({
      query: (user_Id) => ({
        url: `/users/${user_Id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;
