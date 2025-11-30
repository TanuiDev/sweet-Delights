import { ApiUrl } from "../../utils/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export type Tdesigns = {
  DesignID: number;
  DesignName: string;
  Description: string;
  BaseFlavor: string;
  Size: string;
  BasePrice: number;
  ImageUrl: string;
  Category: string;
  Availability: boolean;
  CreatedAt: string;
  UpdatedAt: string;
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
        url: "/designs",
        method: "GET",
      }),
      providesTags: ["Designs"],
    }),
    getDesignById: builder.query<{ data: Tdesigns }, number>({
      query: (DesignID) => ({
        url: `/designs/${DesignID}`,
        method: "GET",
      }),
      providesTags: ["Designs"],
    }),
    addDesign: builder.mutation<{ data: Tdesigns }, Partial<Tdesigns>>({
      query: (design) => ({
        url: "/designs",
        method: "POST",
        body: design,
      }),
      invalidatesTags: ["Designs"],
    }),
    updateDesign: builder.mutation<
      { data: Tdesigns },
      Partial<Tdesigns> & { DesignID: number }
    >({
      query: (design) => ({
        url: `/designs/${design.DesignID}`,
        method: "PUT",
        body: design,
      }),
      invalidatesTags: ["Designs"],
    }),
    deleteDesign: builder.mutation<
      { success: boolean; designId: number },
      number
    >({
      query: (DesignID) => ({
        url: `/designs/${DesignID}`,
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
