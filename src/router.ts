import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Overview from "./components/Overview.vue";
import Calendar from "./components/Calendar.vue";
import Price from "./components/Price.vue";
import Download from "./components/Download.vue";
import Contact from "./components/Contact.vue";
import useAppStore from "./app-store";

const routes = [
    { path: "/", component: Overview },
    { path: "/calendar", component: Calendar },
    { path: "/price", component: Price },
    { path: "/download", component: Download },
    { path: "/contact", component: Contact },
    { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// persist query params on navigation
router.beforeEach((to, _from) => {
    const newQuery = useAppStore().updateURLSyncState(false);
    const technicallyNewQuery = to.query;

    if (newQuery != null) {
        if (!isShallowEqual(newQuery, technicallyNewQuery as { [key: string]: string })) {
            return {
                path: to.path,
                query: newQuery,
            };
        }
    }
});

export default router;

const isShallowEqual = (obj1: { [key: string]: string }, obj2: { [key: string]: string }) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
};
