import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import crateAccessToken from '../libs/jwt.js'

export const register = async (req, res) => {
    const {firstName, lastName, roll, departament, job, departamentId, user, id, password} = req.body
    
    try {

        const paswordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName, 
            lastName, 
            roll, 
            departament, 
            job, 
            departamentId, 
            user, 
            id,
            password: paswordHash
        })
        const userSaved = await newUser.save()

        //por ahora no veo logico, darle un token a un usuario, recien registrado

        /* const token = await crateAccessToken({idDB: userSaved._id, employeeId: userSaved.id, departamentId: userSaved.departamentId, fullName: userSaved.firstName + ' ' + userSaved.lastName})
        res.cookie('token',token) */

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


        const token = await crateAccessToken(
            {
                idDB: userFound._id, 
                employeeId: userFound.id,
                departamentId: userFound.departamentId,
                fullName: userFound.firstName + ' ' + userFound.lastName,
                roll: userFound.roll
            })

        res.cookie('token',token)
        res.send('Loged')
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
export const profile = async (req,res) => {
    const userFound = await User.findById(req.user.idDB)
    if (!userFound) return res.status(400).json({
        message: 'El usuario no encontrado',
    })
    
    return res.json({
        id: userFound.id,
        user: userFound.user,
        password: userFound.password,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        job: userFound.job,
        departament: userFound.departament,
        roll: userFound.roll
    })
}
