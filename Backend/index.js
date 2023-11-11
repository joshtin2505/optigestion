import app from "./app.js"
import { port } from "./config.js"
import { connectDB } from "./db.js"

app.listen(port)
connectDB()
console.log(`Server running on port ${port}`)
