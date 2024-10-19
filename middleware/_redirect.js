// middleware/redirect.ts
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/index.html") {
    return navigateTo("/");
  }
});
