import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
            "@components": fileURLToPath(
                new URL("./src/components", import.meta.url)
            ),
            "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
            "@stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
            "@helpers": fileURLToPath(
                new URL("./src/helpers", import.meta.url)
            ),
            "@packages": fileURLToPath(
                new URL("./src/packages", import.meta.url)
            ),
            "@uikit": fileURLToPath(
                new URL("./src/components/uikit", import.meta.url)
            ),
            "@icons": fileURLToPath(
                new URL("./src/components/icons", import.meta.url)
            ),
        },
    },
});
