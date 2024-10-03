import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import devServer from "@hono/vite-dev-server";
import {node} from "@liuli-util/vite-plugin-node";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    if (command === "serve") {
        // "serve" means Development mode
        //
        // Load all .env variables and set them to process.env for backend use
        // loadEnv follows Vite's normal rules for .env file naming
        // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
        const env = loadEnv(mode, process.cwd(), '')
        process.env = {...process.env, ...env}
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
                    injectClientScript: false,
                    // adapter: nodeAdapter(),
                })
            ]
        }

    }
    // Build
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
