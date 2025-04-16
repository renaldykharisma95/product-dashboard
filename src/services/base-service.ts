import axiosInstance from "./base-connection";
import Cookies from "js-cookie";
import { toQueryString } from "@/app/helpers/queryHandler";
import { deleteAllCookies } from "@/app/helpers/clearCookies";

interface ApiResponse<T> {
  data: T;
}

interface ErrorResponse {
  message: string;
  status: "error";
}

const getAccessToken = () => Cookies.get("ACCESS_TOKEN") || "";
const getRefreshToken = () => Cookies.get("REFRESH_TOKEN") || "";

const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set("ACCESS_TOKEN", accessToken);
  Cookies.set("REFRESH_TOKEN", refreshToken);
};

const getToken = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.post<{
      accessToken: string;
      refreshToken: string;
    }>(
      "/auth/refresh",
      { refreshToken: getRefreshToken() },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    setTokens(response.data.accessToken, response.data.refreshToken);
    return true;
  } catch (err) {
    deleteAllCookies();
    console.error("Token refresh failed", err);
    return false;
  }
};

const request = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  queries?: any,
  retry = true
): Promise<T | ErrorResponse> => {
  try {
    const token = getAccessToken();
    const finalUrl = queries ? `${url}?${toQueryString(queries)}` : url;
    const isLogin = document.location.href.includes("login");

    const config = {
      method,
      url: encodeURI(finalUrl),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...(data && { data: JSON.stringify(data) }),
    };

    if (isLogin) delete config.headers["Authorization"];

    const response = await axiosInstance.request<ApiResponse<T>>(config);

    return response.data as T;
  } catch (error: any) {
    const status = error.response?.status;

    if (status === 401 && retry) {
      const refreshed = await getToken();
      if (refreshed) {
        return request<T>(method, url, data, queries, false);
      }
    }

    throw {
      message: error?.message || "An error occurred",
      status: "error",
    };
  }
};

export const get = <T>(url: string, queries?: any) =>
  request<T>("get", url, undefined, queries);
export const post = <T, D = unknown>(url: string, data: D) =>
  request<T>("post", url, data);
export const put = <T, D = unknown>(url: string, data: D) =>
  request<T>("put", url, data);
export const del = <T>(url: string) => request<T>("delete", url);
