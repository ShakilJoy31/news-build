import { CategoriesResponse } from "@/types/categoryType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCategories(): Promise<CategoriesResponse | null> {
  try {
    const response = await fetch(`${API_URL}/category?limit=100`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data: CategoriesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return null;
  }
}

export async function fetchCategoryById(id: number): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch category by ID");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

