export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  isAvailable: boolean;
  preparationTime: number;
  categoryId: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  isAvailable: boolean;
  preparationTime: number;
  categoryId: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isAvailable?: boolean;
  preparationTime?: number;
  categoryId?: number;
}
