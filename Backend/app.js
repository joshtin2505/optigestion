import express from "express"
import morgan from "morgan"
import authRoutes from "./routes/auth.routes.js"
import requirementsRoutes from "./routes/request.routes.js"
import rolesRoutes from "./routes/roles.routes.js"
import departamentRoutes from "./routes/departament.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
)

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/req", requirementsRoutes)
app.use("/api/roles", rolesRoutes)
app.use("/api/departament", departamentRoutes)

export default app
