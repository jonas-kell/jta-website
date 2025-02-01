import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: "0.0.0.0", // Allows access from outside the container
        port: 5173, // Ensure it matches the exposed port in Docker
    },
});
