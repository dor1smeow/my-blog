import { Hono } from "hono"
import postsRouter from "./routes/posts"

const app = new Hono().basePath("/api")

app.route("/posts", postsRouter)

export default app