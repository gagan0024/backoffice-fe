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
    "Service",
    "SubService",
    "Action",
    "FinalDesigns",
    "FinalProduct",
    "Category",
    "Manufacturer",
    "Item",
    "FinalItem",
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

    deleteBuilding: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
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

    addSubBuilding: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["SubBuilding"],
    }),

    updateSubBuilding: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["SubBuilding"],
    }),

    deleteSubBuilding: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubBuilding"],
    }),

    getSubBuildingListByID: builder.query<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}sub-buildings?building_id=${data.building_id}`,
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

    getLevelsListByID: builder.query<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}levels?sub_building_id=${data.sub_building_id}`,
        method: "GET",
      }),
      providesTags: ["Level"],
    }),

    addLevels: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Level"],
    }),

    updateLevels: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Level"],
    }),

    deleteLevels: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Level"],
    }),

    getRoomsList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}rooms`,
        method: "GET",
      }),
      providesTags: ["Rooms"],
    }),

    deleteRooms: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rooms"],
    }),

    addRooms: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Rooms"],
    }),

    updateRooms: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Rooms"],
    }),

    getProductList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}products`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getProductListByID: builder.query<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}products?product_sub_service_id=${data.product_sub_service_id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Product"],
    }),

    getManufacturerList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}manufacturer`,
        method: "GET",
      }),
      providesTags: ["Manufacturer"],
    }),

    addManufacturer: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Manufacturer"],
    }),

    deleteManufacturer: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Manufacturer"],
    }),

    updateManufacturer: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Manufacturer"],
    }),

    getServiceList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}services`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),

    addService: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Service"],
    }),

    updateService: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Service"],
    }),

    deleteService: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),

    getSubServiceList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}sub-services`,
        method: "GET",
      }),
      providesTags: ["SubService"],
    }),

    addSubService: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["SubService"],
    }),

    updateSubService: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["SubService"],
    }),

    deleteSubService: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubService"],
    }),
    getSubServiceListByID: builder.query<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}sub-services?service_id=${data.service_id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getProductSubServiceListByID: builder.query<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}product-sub-services?service_id=${data.service_id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getProductSubServiceList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}product-sub-services`,
        method: "GET",
      }),
      providesTags: ["SubService"],
    }),

    addProductSubService: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["SubService"],
    }),

    updateProductSubService: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["SubService"],
    }),

    deleteProductSubService: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubService"],
    }),

    addAction: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Action"],
    }),

    updateAction: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Action"],
    }),

    getActionsList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}actions`,
        method: "GET",
      }),
      providesTags: ["Action"],
    }),

    deleteActions: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Action"],
    }),

    getActionsListByID: builder.query<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}actions?sub_service_id=${data.sub_service_id}`,
        method: "GET",
      }),
      providesTags: ["Action"],
    }),

    addFinalDesigns: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["FinalDesigns"],
    }),

    addFinalProduct: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["FinalProduct"],
    }),

    getItemList: builder.query<any, any>({
      query: () => ({
        url: `${apiRoot}items`,
        method: "GET",
      }),
      providesTags: ["Item"],
    }),

    addItem: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Item"],
    }),

    deleteItem: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),

    updateItem: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Item"],
    }),

    getItemsListByID: builder.query<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}items?sub_service_id=${data.sub_service_id}`,
        method: "GET",
      }),
      providesTags: ["Item"],
    }),

    addFinalItem: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${apiRoot}${data.url}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["FinalItem"],
    }),

    // getCategoryList: builder.query<any, any>({
    //   query: () => ({
    //     url: `${apiRoot}products/categories`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Category"],
    // }),
  }),
});

export const {
  useAdminLoginMutation,
  useAddLocationMutation,
  useGetLocationListQuery,
  useDeleteLocationMutation,
  useUpdateLocationMutation,
  useGetBuildingListQuery,
  useAddBuildingMutation,
  useUpdateBuildingMutation,
  useGetSubBuildingListQuery,
  useGetLevelsListQuery,
  useGetRoomsListQuery,
  useDeleteBuildingMutation,
  useAddSubBuildingMutation,
  useUpdateSubBuildingMutation,
  useDeleteSubBuildingMutation,
  useAddLevelsMutation,
  useUpdateLevelsMutation,
  useDeleteLevelsMutation,
  useGetServiceListQuery,
  useGetSubServiceListQuery,
  useDeleteRoomsMutation,
  useAddRoomsMutation,
  useUpdateRoomsMutation,
  useGetSubBuildingListByIDQuery,
  useGetLevelsListByIDQuery,
  useGetProductListQuery,
  useGetProductListByIDQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddServiceMutation,
  useAddSubServiceMutation,
  useDeleteServiceMutation,
  useDeleteSubServiceMutation,
  useUpdateServiceMutation,
  useUpdateSubServiceMutation,
  useGetSubServiceListByIDQuery,
  useAddActionMutation,
  useUpdateActionMutation,
  useDeleteActionsMutation,
  useGetActionsListQuery,
  useGetActionsListByIDQuery,
  useLazyGetSubBuildingListQuery,
  useLazyGetLevelsListQuery,
  useLazyGetRoomsListQuery,
  useAddFinalDesignsMutation,
  useAddFinalProductMutation,
  useGetProductSubServiceListQuery,
  useGetProductSubServiceListByIDQuery,
  useAddProductSubServiceMutation,
  useUpdateProductSubServiceMutation,
  useDeleteProductSubServiceMutation,
  useGetManufacturerListQuery,
  useAddManufacturerMutation,
  useUpdateManufacturerMutation,
  useDeleteManufacturerMutation,
  useGetItemListQuery,
  useDeleteItemMutation,
  useAddItemMutation,
  useUpdateItemMutation,
  useGetItemsListByIDQuery,
  useAddFinalItemMutation,
} = api;
