import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const api = new Hono()
  .get("/", (c) => c.json({ message: "Hello Hono!" }))
  .get(
    "/hello/:name",
    zValidator("param", z.object({ name: z.string() })),
    (c) => {
      const messages = [
        "Nice day, huh?",
        "How's it going?",
        "Welcome!",
        "Good weather, isn't it?",
        "I'm a computer.",
      ];

      const name = c.req.valid("param").name;

      return c.json({
        message: `Hello ${name}! ${messages[Math.floor(Math.random() * messages.length)]}`,
      });
    },
  )
  .post(
    "/posts",
    zValidator(
      "form",
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    ),
    (c) => {
      // ...
      return c.json(
        {
          ok: true,
          message: "Created!",
        },
        201,
      );
    },
  );

export type AppType = typeof api;

export default api;
