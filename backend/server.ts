import {Hono} from "hono";
import { readFile } from "node:fs/promises"
import {serveStatic} from "@hono/node-server/serve-static";
import {serve} from "@hono/node-server";
import api from "./api";

console.log("Backend secret:", process.env.BACKEND_SECRET)

const app = new Hono()

app.use("*", async (c, next) => {
    c.res.headers.set("X-Hello", "Hono")
    await next()
})
app.route("/api", api)

const isProd = process.env["NODE_ENV"] === "production"
if (isProd) {
    // Serve the built frontend from build
    app.use(serveStatic({root: "build/"})) // path must end with '/'

    // Serve the index.html for all other routes (for SPA routing)
    const html = await readFile("build/index.html", "utf8")
    app.get('*', (c) => c.html(html)) // html in dist

    // Start the server
    serve({...app, port: 4000}, info => {
        console.log(`Listening on http://localhost:${info.port}`);
    });
}

export default app
