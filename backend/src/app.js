import e from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routers/auth";
import { materialsRouter } from "./routers/materials";

dotenv.config();

const app = e()

app.use(cors())
app.use(e.json())

app.use("/api", authRouter);
app.use("/api", materialsRouter)

export default app