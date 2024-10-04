export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    const access_token = localStorage.getItem("access_token");

    const user = localStorage.getItem("user");

    return !!(access_token && user);
  }
    return false;
};
