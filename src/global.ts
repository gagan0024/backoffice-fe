import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./redux/store";
import { accessAdminTokken, logoutAction } from "./redux/slices/loingSlice";
export const apiRoot = import.meta.env.VITE_API_ROOT;

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: apiRoot,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).adminLoginSlice.accessToken;
    const authtoken = headers.get("AuthorizationToken");
    if (token && !authtoken) {
      headers.set("Authorization", "Bearer " + token);
    }
    headers.set("Accept", "*/*");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result: any = await baseQuery(args, api, extraOptions);

  if (result?.data?.status_code === "ADMIN_TOKEN_EXPIRED") {
    const refreshToken =
      (api.getState() as RootState).adminLoginSlice.refreshToken || "";
    const headers = {
      AuthorizationToken: refreshToken,
    };
    const refreshResult: any = await baseQuery(
      {
        url: "get-new-accesstoken",
        headers,
      },
      api,
      extraOptions
    );
    if (refreshResult.data?.data?.access_token) {
      api.dispatch(accessAdminTokken(refreshResult.data?.data?.access_token));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery(
        {
          url: "logout",
          method: "POST",
          headers,
        },
        api,
        extraOptions
      );
      api.dispatch(logoutAction());
    }
  }
  return result;
};

export const baseQueryWithRetryAndReAuth = retry(baseQueryWithReauth, {
  maxRetries: 0,
});
