import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import crateAccessToken from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"

export const register = async (req, res) => {
  // Test THIS
  const {
    nombre,
    apellido,
    trabajo,
    email,
    userName,
    password,
    departamento,
    rolUsuario,
  } = req.body
  const paswordHash = await bcrypt.hash(password, 10)

  fetch("http://localhost:8080/api/usuario/guardar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      nombre,
      apellido,
      trabajo,
      email,
      userName,
      departamento,
      rolUsuario,
      password: paswordHash,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Usuario creado" })
    })
    .catch(
      (error) =>
        (error.status === 302) ===
        res.status(302).json({ message: "El usuario ya existe" })
    )
}
export const login = async (req, res) => {
  const { user, password } = req.body

  try {
    const userFound = await User.findOne({ user })
    if (!userFound) return res.status(400).json(["El usuario no existe"])

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) return res.status(400).json(["La contraseña es incorrecta"])

    const token = await crateAccessToken({
      idDB: userFound._id,
      employeeId: userFound.id,
      departamentId: userFound.departamentId,
      fullName: userFound.firstName + " " + userFound.lastName,
      roll: userFound.roll,
    })

    res.cookie("token", token)
    res.json(userFound)
  } catch (error) {
    res.status(500).json([error.message])
  }
}
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(Date.now(0)),
  })
  res.status(200).json(["Sesión cerrada"])
}
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.idDB)
  if (!userFound)
    return res.status(400).json({
      message: "El usuario no encontrado",
    })

  return res.json({
    id: userFound.id,
    user: userFound.user,
    password: userFound.password,
    firstName: userFound.firstName,
    lastName: userFound.lastName,
    job: userFound.job,
    departament: userFound.departament,
    roll: userFound.roll,
  })
}
export const updateUser = async (req, res) => {
  try {
    const userToUpdate = req.body

    if (req.body.password) {
      const paswordHash = await bcrypt.hash(req.body.password, 10)
      userToUpdate.password = paswordHash
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      userToUpdate,
      { new: true }
    )
    if (!updatedUser)
      return res
        .status(400)
        .json({ message: "No se pudo Actualizar el usuario" })
    res.status(200).json({ message: "Updated" })
  } catch (error) {
    console.log(error)
  }
}
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser)
      return res.status(200).json({ message: "No se pudo eliminar el usuario" })
    return res.status(200).json({ message: "Usuario eliminado" })
  } catch (error) {
    console.log(error)
  }
}
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (!users || users.length === 0)
      return res.json({ message: "No se encontraron usuarios" })
    return res.json(users)
  } catch (error) {
    console.log(error)
  }
}
export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json(["No autorizado"])
  jwt.verify(token, SECRET_KEY, async (err, user) => {
    if (err) return res.status(err).json(["No autorizado"])

    const userFound = await User.findById(user.idDB)
    if (!userFound) return res.status(401).json(["No autorizado"])
    return res.json(userFound)
  })
}
