import {Hono} from "hono";

export const api = new Hono()
    .get("/", c => c.json({message: "Hello Hono!"}))
    .get("/hello/:name", c => {
        const messages = [
            "Nice day, huh?",
            "How's it going?",
            "Welcome!",
            "Good weather, isn't it?",
            "I'm a computer."
        ]

        const name = c.req.param("name")

        return c.json({message: `Hello ${name}! ${messages[Math.floor(Math.random() * messages.length)]}`})

    })