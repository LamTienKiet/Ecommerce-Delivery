import axiosClient from "../utils/axiosClient";
import type {
  CreateProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from "../type_auth_api/products/product.api";

export async function getProducts(): Promise<ProductResponse[]> {
  return await axiosClient.get<any, ProductResponse[]>("/product");
}

export async function getProductById(id: number): Promise<ProductResponse> {
  return await axiosClient.get<any, ProductResponse>(`/product/${id}`);
}

export async function createProducts(
  data: CreateProductRequest,
): Promise<ProductResponse> {
  return await axiosClient.post<any, ProductResponse>("/product", data);
}

export async function updateProduct(
  id: number,
  data: UpdateProductRequest,
): Promise<ProductResponse> {
  return await axiosClient.patch<any, ProductResponse>(`/product/${id}`, data);
}

export async function deleteProduct(id: number): Promise<void> {
  await axiosClient.delete(`/product/${id}`);
}

export async function uploadProductImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  return await axiosClient.post<any, { url: string }>("/product/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
