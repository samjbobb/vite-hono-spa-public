import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import devServer from "@hono/vite-dev-server";
import {node} from "@liuli-util/vite-plugin-node";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    if (command === "serve") {
        // Development mode
        return {
            plugins: [
                react(),
                devServer({
                    entry: "backend/server.ts",
                    exclude: [
                        // /.*\.(svg|png)($|\?)/,
                        // ...defaultOptions.exclude,
                        /^(?!\/api).*$/
                    ],
                    injectClientScript: false
                })
            ]
        }

    }
    if (mode === "client") {
        // Build Client
        return {
            build: {
                outDir: "build",
                rollupOptions: {
                    // Extra insurance to keep the backend code out of the client build
                    external: [/\/backend\//]
                },
                copyPublicDir: true,
            },
            plugins: [
                react(),
            ]
        }
    } else if (mode === "server") {
        // Build Server
        return {
            build: {
                minify: false,
                outDir: "dist",
                rollupOptions: {
                    input: 'backend/server.ts',
                },
                copyPublicDir: false,
            },
            plugins: [
                node({
                    shims: true,
                })
            ]
        }
    } else {
        throw new Error(`Must specify either 'client' or 'server' for build.`)
    }
})
