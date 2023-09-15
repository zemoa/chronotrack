import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("@/views/pages/Workload.vue"),
    },
    {
        path: "/projects",
        component: () => import("@/views/pages/Projects.vue"),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;