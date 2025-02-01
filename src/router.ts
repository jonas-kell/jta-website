import { createRouter, createWebHistory } from "vue-router";
import Overview from "./components/Overview.vue";
import Calendar from "./components/Calendar.vue";

const routes = [
    { path: "/", component: Overview },
    { path: "/calendar", component: Calendar },
    { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
