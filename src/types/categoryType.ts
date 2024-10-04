// types/categoryType.ts
export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  categories: Category[];
  limit: number;
}
