import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount("#app");

function setFullSize() {
    document.documentElement.style.setProperty("--cfh", `${window.innerHeight}px`);
    document.documentElement.style.setProperty("--cfw", `${window.innerWidth}px`);
}
setFullSize();
window.addEventListener("resize", setFullSize);
