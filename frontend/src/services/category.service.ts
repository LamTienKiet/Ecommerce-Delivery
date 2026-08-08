import axios from "axios";
import type {
  UpdateCategoryRequest,
  CategoryResponse,
  CreateCategoryRequest,
} from "../type_auth_api/category/category.api";

const API_URL = `${import.meta.env.VITE_API_URL}/category`;

export async function getCategory(): Promise<CategoryResponse[]> {
  const res = await axios.get<CategoryResponse[]>(API_URL);
  return res.data;
}

export async function getCategoryById(id: number): Promise<CategoryResponse> {
  const res = await axios.get<CategoryResponse>(`${API_URL}/${id}`);
  return res.data;
}

export async function createCategory(
  data: CreateCategoryRequest,
): Promise<CategoryResponse> {
  const res = await axios.post<CategoryResponse>(API_URL, data);
  return res.data;
}

export async function updateCategory(
  id: number,
  data: UpdateCategoryRequest,
): Promise<CategoryResponse> {
  const res = await axios.patch<CategoryResponse>(`${API_URL}/${id}`, data);

  return res.data;
}

export async function deleteCategory(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
