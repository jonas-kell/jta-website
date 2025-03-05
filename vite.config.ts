import { defineConfig, Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs";

const base64Loader: Plugin = {
    name: "base64-loader",
    transform(_: any, id: string) {
        const [path, query] = id.split("?");
        if (query != "base64") return null;

        const data = fs.readFileSync(path);
        const base64 = data.toString("base64");

        return `export default '${base64}';`;
    },
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), base64Loader],
    server: {
        host: "0.0.0.0", // Allows access from outside the container
        port: 5173, // Ensure it matches the exposed port in Docker
    },
});
