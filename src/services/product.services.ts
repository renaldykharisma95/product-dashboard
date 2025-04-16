import { del, get, post, put } from "./base-service";

export const GetProductList = async (query: any) => {
  try {
    const isSearch = !!query?.q;
    const resp = await get<any>(`/products${isSearch ? "/search" : ""}`, query);
    return resp;
  } catch (error) {
    throw error as any;
  }
};

export const PostProduct = async (payload: any) => {
  try {
    const resp = await post<any>("/products/add", payload);
    return resp?.data ? resp?.data : resp;
  } catch (error) {
    throw error as any;
  }
};

export const UpdateProduct = async (id: string, payload: any) => {
  try {
    const resp = await put<any>(`/products/${id}`, payload);
    return resp?.data ? resp?.data : resp;
  } catch (error) {
    throw error as any;
  }
};

export const DeleteProduct = async (id: string) => {
  try {
    const resp = await del<any>(`/products/${id}`);
    return resp?.data ? resp?.data : resp;
  } catch (error) {
    throw error as any;
  }
};
