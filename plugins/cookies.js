import Cookies from "js-cookie";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      setCookie(name, value, options = {}) {
        Cookies.set(name, value, { expires: 7, ...options }); // Par défaut, le cookie expire après 7 jours
      },
      getCookie(name) {
        return Cookies.get(name);
      },
      removeCookie(name) {
        Cookies.remove(name);
      },
    },
  };
});
