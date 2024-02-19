export function logout() {
  // localStorage.removeItem("user")
  localStorage.removeItem("user");
  localStorage.removeItem("isAuth");
  window.location.reload();
}
