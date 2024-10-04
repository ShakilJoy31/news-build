import { Post, PostsResponse } from "@/types/postType";

type Params = {
  slug?: string;
  limit?: number;
  page?: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAllPosts(params?: {
  limit?: number;
  page?: number;
}): Promise<PostsResponse | null> {
  try {
    const limit = params?.limit ?? 10;
    const page = params?.page ?? 1;

    const response = await fetch(
      `${API_URL}/post?limit=${limit}&page=${page}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data: PostsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }
}

export async function fetchPostsByCategory(params: {
  slug: string;
  limit?: number;
  page?: number;
}): Promise<PostsResponse | null> {
  try {
    const limit = params.limit ?? 10;
    const page = params.page ?? 1;

    const response = await fetch(
      `${API_URL}/post/${params.slug}?limit=${limit}&page=${page}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts by category");
    }

    const data: PostsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch posts by category:", error);
    return null;
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(`${API_URL}/post/single/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch post by slug");
    }

    const data: Post = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch post by slug:", error);
    return null;
  }
}
