import express from "express"
import morgan from "morgan"
import authRoutes from "./routes/auth.routes.js"
import operativeRoutes from "./routes/request.routes.js"
import cookieParser from "cookie-parser"
const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api',authRoutes)
app.use('/api',operativeRoutes)


export default app
