import { createRouter, createWebHistory } from "vue-router";

export const WelcomeRoute = Symbol();
export const GameRoute = Symbol();
export const ResultRoute = Symbol();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: WelcomeRoute,
      component: () => import("../views/WelcomeView.vue"),
    },
    {
      path: "/game",
      name: GameRoute,
      component: () => import("../views/GameView.vue"),
    },
    {
      path: "/result",
      name: ResultRoute,
      component: () => import("../views/ResultView.vue"),
    },
  ],
});

export default router;
