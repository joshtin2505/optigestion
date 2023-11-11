import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import crateAccessToken from '../libs/jwt.js'

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
        const userSaved = await newUser.save()
        const token = await crateAccessToken({idDB: userSaved._id})
        res.cookie('token',token)

        res.json({
            idDB: userSaved._id,
            user: userSaved.user,
            password: userSaved.password
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const login = async (req, res) => {
    const {user, password} = req.body
    
    try {

        const userFound = await User.findOne({user})
        if(!userFound) return res. status(400).json({message: 'El usuario no existe'})

        const isMatch = await bcrypt.compare(password, userFound.password)
        if(!isMatch) return res.status(400).json({message: 'La contraseña es incorrecta'})


        const token = await crateAccessToken({idDB: userFound._id})

        res.cookie('token',token)
        res.json({
            idDB: userFound._id,
            user: userFound.user,
            password: userFound.password
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const logout = (req, res) => {
    res.cookie('token', '',
    {
        expires: new Date(Date.now(0))
    })
    res.status(200).json({message: 'Sesión cerrada'})
}