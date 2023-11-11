import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
export const register = async (req, res) => {
    const {firstName, lastName, userType, departament, job, departamentId, user, id, password} = req.body
    
    try {

        const paswordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName, 
            lastName, 
            userType, 
            departament, job, 
            departamentId, 
            user, 
            id,
            password: paswordHash
        })
        await newUser.save()
        res.send('save')
    } catch (error) {
        console.log(error)
    }
}
export const login = (req, res) => {
    // res.send('login')
    res.send('login')
}
