import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import crateAccessToken from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"
import {
  deleteUsuario,
  getAllUsers,
  getUser,
  registerUsuario,
  updateUsuario,
} from "../api/user.api.js"

export const register = async (req, res) => {
  // Test THIS
  const {
    nombre,
    apellido,
    trabajo,
    email,
    userName,
    departamento,
    rolUsuario,
    password,
  } = req.body
  const paswordHash = await bcrypt.hash(password, 10)

  registerUsuario({
    nombre,
    apellido,
    trabajo,
    email,
    userName,
    departamento,
    rolUsuario,
    password: paswordHash,
  })
    .then(() => {
      res.status(200).json({ message: "Usuario creado" })
    })
    .catch((error) => {
      console.log(error)
      error.status === 302
        ? res.status(302).json({ message: "El usuario ya existe", error })
        : res
            .status(400)
            .json({ message: "No se pudo crear el usuario", error })
    })
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
  getUser(req.user.idDB)
    .then((response) => {
      if (!response.data)
        return res.status(400).json({
          message: "El usuario no encontrado",
        })
      return res.json({
        user: response.data.userName,
        firstName: response.data.nombre,
        lastName: response.data.apellido,
        job: response.data.trabajo,
        departament: response.data.departamento.titulo,
        roll: response.data.rolUsuario.rol,
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
export const updateUser = async (req, res) => {
  const userToUpdate = req.body
  userToUpdate.password
    ? (userToUpdate.password = await bcrypt.hash(userToUpdate.password, 10))
    : null
  updateUsuario(req.params.id, { ...userToUpdate })
    .then((response) => {
      !response.data
        ? res.status(400).json({ message: "No se pudo Actualizar el usuario" })
        : res.status(200).json({ message: "Updated" })
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "No se pudo Actualizar el usuario", error })
    })
}
export const deleteUser = async (req, res) => {
  deleteUsuario(req.params.id)
    .then((response) => {
      !response.data
        ? res.status(200).json({ message: "No se pudo eliminar el usuario" })
        : res.status(200).json({ message: "Usuario eliminado" })
    })
    .catch((error) => {
      console.log(error)
    })
}
export const getUsers = async (req, res) => {
  getAllUsers()
    .then((response) => {
      if (!response.data || response.data.length === 0)
        return res.json({ message: "No se encontraron usuarios" })
      return res.json(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
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
