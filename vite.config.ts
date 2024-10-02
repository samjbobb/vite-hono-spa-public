import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import devServer, {defaultOptions} from "@hono/vite-dev-server";
import {node} from "@liuli-util/vite-plugin-node";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    if (command === "serve") {
        // Development mode
        return {
            plugins: [
                react(),
                devServer({
                    entry: "server.ts",
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
                // rollupOptions: {
                //     input: ['./src/main.tsx'],
                // output: {
                //     entryFileNames: 'static/client.js',
                //     chunkFileNames: 'static/assets/[name]-[hash].js',
                //     assetFileNames: 'static/assets/[name].[ext]',
                // },
                // },
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
                    input: './server.ts',
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
