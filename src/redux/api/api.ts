import { createApi } from "@reduxjs/toolkit/query/react";
import { apiRoot, baseQueryWithRetryAndReAuth } from "../../global";

export const api = createApi({
  reducerPath: "buildings",
  baseQuery: baseQueryWithRetryAndReAuth,
  tagTypes: [
    "Login",
    "Location",
    "Product",
    "Building",
    "SubBuilding",
    "Level",
    "Rooms",
  ],

  endpoints: (builder) => ({
    adminLogin: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Login"],
    }),

    addLocation: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Location"],
    }),

    getLocationList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}locations`,
        method: "GET",
      }),
      providesTags: ["Location"],
    }),

    deleteLocation: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),

    updateLocation: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Location"],
    }),

    getBuildingList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}buildings`,
        method: "GET",
      }),
      providesTags: ["Building"],
    }),

    addBuilding: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Building"],
    }),

    updateBuilding: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Building"],
    }),

    getSubBuildingList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}sub-buildings`,
        method: "GET",
      }),
      providesTags: ["SubBuilding"],
    }),

    getLevelsList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}levels`,
        method: "GET",
      }),
      providesTags: ["Level"],
    }),

    getRoomsList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}rooms`,
        method: "GET",
      }),
      providesTags: ["Rooms"],
    }),

    getProductList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}products`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

  }),
});

export const {
  useAdminLoginMutation,
  useAddLocationMutation,
  useGetLocationListQuery,
  useDeleteLocationMutation,
  useUpdateLocationMutation,
  useGetProductListQuery,
  useGetBuildingListQuery,
  useAddBuildingMutation,
  useUpdateBuildingMutation,
  useGetSubBuildingListQuery,
  useGetLevelsListQuery,
  useGetRoomsListQuery,
} = api;
