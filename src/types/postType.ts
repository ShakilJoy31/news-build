import { Category } from "./categoryType";
import { User } from "./userType";

export interface Post {
  id: number;
  title?: string;
  slug?: string;
  content?: string;
  thumbnail?: string;
  views: number;
  status: "pending" | "approved" | "rejected";
  message?: string;
  authorId: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
  // Include related models if needed
  author?: User;
  category?: Category;
  subCategoryId?: number;
}

export interface PostsResponse {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  posts: Post[];
  limit: number;
}
