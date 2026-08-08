import axios from "axios";
import type {
  CreateProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from "../type_auth_api/products/product.api";

const API_URL = `${import.meta.env.VITE_API_URL}/product`;

export async function getProducts(): Promise<ProductResponse[]> {
  const res = await axios.get<ProductResponse[]>(API_URL);
  return res.data;
}

export async function getProductById(id: number): Promise<ProductResponse> {
  const res = await axios.get<ProductResponse>(`${API_URL}/${id}`);
  return res.data;
}

export async function createProducts(
  data: CreateProductRequest,
): Promise<ProductResponse> {
  const res = await axios.post<ProductResponse>(API_URL, data);
  return res.data;
}

export async function updateProduct(
  id: number,
  data: UpdateProductRequest,
): Promise<ProductResponse> {
  const res = await axios.patch<ProductResponse>(`${API_URL}/${id}`, data);

  return res.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}

export async function uploadProductImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post<{ url: string }>(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function addToCart() {}
