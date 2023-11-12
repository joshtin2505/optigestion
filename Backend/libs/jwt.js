import { SECRET_KEY } from "../config.js"
import jwt from 'jsonwebtoken'

export default function crateAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            SECRET_KEY,
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
                
            }
            )
    })
} 