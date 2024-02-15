import { createRouter, createWebHistory } from "vue-router";

 const routes = [
    {
      path: "/login",
      name: "Login",
      component: () => import("../auth/auth.vue"),
      meta: {
        layout: "full",
        redirectIfLoggedIn: true,
      },
    },
  {
    path: "/",
    redirect: "/list",
    children: [
      {
        path: "list",
        name: "ListaTareas",
        component: () => import("../components/lista.vue"),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _, next) => {
  const isLoggedIn = localStorage.getItem("token");
  if (!isLoggedIn && to.name != "Login") next({ name: "Login" });
  if (!isLoggedIn && to.name === "Login") next();
  if (isLoggedIn && to.name === "Login") next({ name: "ListaTareas" });
  next();
});

export default router;
