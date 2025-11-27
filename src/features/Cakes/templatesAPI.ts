import { ApiUrl } from "../../utils/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export type Tdesigns = {
  designId: number;
  designName: string;
  description: string;
  price: number;
  imageURL: string;
  isactive: boolean;
  createdAt: string;
  updatedAt: string;
};

const templatesApi = createApi({
  reducerPath: "templatesApi",
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
  tagTypes: ["Designs"],
  endpoints: (builder) => ({
    getDesigns: builder.query<{ data: Tdesigns[] }, void>({
      query: () => ({
        url: "/teamplates",
        method: "GET",
      }),
      providesTags: ["Designs"],
    }),
    getDesignById: builder.query<{ data: Tdesigns }, number>({
      query: (designId) => ({
        url: `/teamplates/${designId}`,
        method: "GET",
      }),
      providesTags: ["Designs"],
    }),
    addDesign: builder.mutation<{ data: Tdesigns }, Partial<Tdesigns>>({
      query: (design) => ({
        url: "/teamplates",
        method: "POST",
        body: design,
      }),
      invalidatesTags: ["Designs"],
    }),
    updateDesign: builder.mutation<{ data: Tdesigns }, Partial<Tdesigns>>({
      query: (design) => ({
        url: `/teamplates/${design.designId}`,
        method: "PUT",
        body: design,
      }),
      invalidatesTags: ["Designs"],
    }),
    deleteDesign: builder.mutation<
      { success: boolean; designId: number },
      number
    >({
      query: (designId) => ({
        url: `/teamplates/${designId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Designs"],
    }),
  }),
});

export const {
  useGetDesignsQuery,
  useGetDesignByIdQuery,
  useAddDesignMutation,
  useUpdateDesignMutation,
  useDeleteDesignMutation,
} = templatesApi;

export default templatesApi;
