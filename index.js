import express from "express";
import { connectToEnv } from "./config/env.config.js";
import { connectToDatabase } from "./config/db.config.js";
import { AuthRouter } from "./router/auth.routes.js";
import { UserRouter } from "./router/user.route.js";
import { AdminRouter } from "./router/admin.route.js";
import { imageRouter } from "./router/image.route.js";
import { log } from "./logger/logger.js"; // for custom console.log

const app = express();
connectToEnv();
connectToDatabase()


app.use(express.json()); // to parses the incoming json data , when client do a post/put request

const path = `/api/v1`

log(path)
app.use(`${path}/auth`, AuthRouter)
app.use(`${path}/home`, UserRouter)
app.use(`${path}/home`, AdminRouter)
app.use(`${path}`, imageRouter)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`server is running successfully at port ${PORT}`);
})
