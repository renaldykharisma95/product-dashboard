import { get, post } from "./base-service";

interface LoginPayload {
  username: string;
  password: string;
}

export const PostLogin = async (data: LoginPayload) => {
  try {
    const resp = await post<any, LoginPayload>("/auth/login", data);
    return resp;
  } catch (error) {
    throw error as any;
  }
};

export const GetMe = async () => {
  try {
    const resp = await get<any>("/auth/me");
    return resp;
  } catch (error) {
    throw error as any;
  }
};
