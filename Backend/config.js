import multer from "multer"

const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })

export const port = 3000
export const SECRET_KEY= "SECRET_KEY"
