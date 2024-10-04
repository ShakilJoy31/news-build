// Log out function
export const logOut = () => {
  console.log("Removing items from localStorage...");
  // Remove items from localStorage
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");

  // Reload the page
  window.location.reload();
};
