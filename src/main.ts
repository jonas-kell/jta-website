import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount("#app");

function setFullSize() {
    const scrollBuffer = 20;

    document.documentElement.style.setProperty("--cfh", `${window.innerHeight - scrollBuffer}px`);
    document.documentElement.style.setProperty("--cfw", `${window.innerWidth - scrollBuffer}px`);
}
setFullSize();
window.addEventListener("resize", setFullSize);
