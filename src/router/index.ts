import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import Home from "@/pages/Home.vue";
import Guides from "@/pages/Guides.vue";
import Profile from "@/pages/Profive.vue";
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/login",
    component: AuthLayout,
    children: [{ path: "", component: Login }],
  },
  {
    path: "/register",
    component: AuthLayout,
    children: [{ path: "", component: Register }],
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: Home },
      { path: "guides", component: Guides },
      { path: "profile", component: Profile },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (
    to.matched.some(
      (record) => record.path !== "/login" && record.path !== "/register"
    ) &&
    !authStore.isLoggedIn
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
