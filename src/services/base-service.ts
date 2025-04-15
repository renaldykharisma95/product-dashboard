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

const token = Cookies.get("ACCESS_TOKEN");
const refreshToken = Cookies.get("REFRESH_TOKEN");

const getToken = async () => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const res = await axiosInstance.post<{
      accessToken: string;
      refreshToken: string;
    }>("/auth/refresh", { refreshToken: refreshToken }, headers);
    const newAccessToken = res.data.accessToken || "";
    const newRefreshToken = res.data.refreshToken || "";
    Cookies.set("ACCESS_TOKEN", newAccessToken);
    Cookies.set("REFRESH_TOKEN", newRefreshToken);
  } catch (err) {
    deleteAllCookies();
    console.error("Token refresh failed", err);
  }
};

export const get = async <T>(
  url: string,
  queries?: any
): Promise<T | ErrorResponse> => {
  try {
    const token = Cookies.get("ACCESS_TOKEN");
    let reUrl = "";
    if (queries) reUrl = url + `?${toQueryString(queries)}`;
    const response = await axiosInstance.get<ApiResponse<T>>(
      encodeURI(reUrl ? reUrl : url),
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response as T;
  } catch (error: any) {
    if (error.response?.status === 401) {
      await getToken();
      await get(url);
    }
    throw {
      message: error instanceof Error ? error.message : "An error occurred",
      status: "error",
    };
  }
};

export const post = async <T, D = unknown>(
  url: string,
  data: D
): Promise<T | ErrorResponse> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = token ? `Bearer ${token}` : "";
    }

    const response = await axiosInstance.post<ApiResponse<T>>(
      encodeURI(url),
      JSON.stringify(data),
      {
        headers,
      }
    );

    return response.data as T;
  } catch (error: any) {
    throw {
      message: error?.message ?? "An error occurred",
      status: "error",
    };
  }
};

export const put = async <T, D = unknown>(
  url: string,
  data: D,
  token?: string
): Promise<T | ErrorResponse> => {
  try {
    const response = await axiosInstance.put<ApiResponse<T>>(
      encodeURI(url),
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data as T;
  } catch (error) {
    throw {
      message: error instanceof Error ? error.message : "An error occurred",
      status: "error",
    };
  }
};

export const del = async <T>(
  url: string,
  token?: string
): Promise<T | ErrorResponse> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<T>>(
      encodeURI(url),
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data as T;
  } catch (error) {
    throw {
      message: error instanceof Error ? error.message : "An error occurred",
      status: "error",
    };
  }
};
