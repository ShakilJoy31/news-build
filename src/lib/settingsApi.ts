const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchSettings() {
  try {
    const response = await fetch(`${API_URL}/settings`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch settings");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}
