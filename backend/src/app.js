import e from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app = e()

app.use(cors())
app.use(e.json())

export default app