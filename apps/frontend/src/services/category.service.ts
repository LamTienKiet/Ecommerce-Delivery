import axiosClient from "../utils/axiosClient";
import type {
  UpdateCategoryRequest,
  CategoryResponse,
  CreateCategoryRequest,
} from "../type_auth_api/category/category.api";

export async function getCategory(): Promise<CategoryResponse[]> {
  return await axiosClient.get<any, CategoryResponse[]>("/category");
}

export async function getCategoryById(id: number): Promise<CategoryResponse> {
  return await axiosClient.get<any, CategoryResponse>(`/category/${id}`);
}

export async function createCategory(
  data: CreateCategoryRequest,
): Promise<CategoryResponse> {
  return await axiosClient.post<any, CategoryResponse>("/category", data);
}

export async function updateCategory(
  id: number,
  data: UpdateCategoryRequest,
): Promise<CategoryResponse> {
  return await axiosClient.patch<any, CategoryResponse>(`/category/${id}`, data);
}

export async function deleteCategory(id: number): Promise<void> {
  await axiosClient.delete(`/category/${id}`);
}
