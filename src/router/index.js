import { createRouter, createWebHistory } from "vue-router";
import Pomodoro from "../views/Pomodoro.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Pomodoro,
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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
