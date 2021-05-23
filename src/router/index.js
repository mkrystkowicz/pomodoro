import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "Pomodoro" }
  },
  {
    path: "/pomodoro",
    name: "Pomodoro",
    component: () => import("../views/Pomodoro.vue")
  },
  {
    path: "/short-break",
    name: "Short Break",
    component: () => import("../views/ShortBreak.vue")
  },
  {
    path: "/long-break",
    name: "Long Break",
    component: () => import("../views/LongBreak.vue")
  },
  { path: "/:catchAll(.*)", component: () => import("../views/NotFound.vue") }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
