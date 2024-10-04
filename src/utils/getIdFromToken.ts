import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
}

export const getIdFromToken = (): number | null => {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      return null;
    }

    const decodedToken = jwtDecode<DecodedToken>(token);
    // console.log(decodedToken);

    return decodedToken.id;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
