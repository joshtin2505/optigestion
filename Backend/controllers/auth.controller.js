import bcrypt from "bcryptjs"
import crateAccessToken from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"
import {
  deleteUsuario,
  getAllUsers,
  getUser,
  getUserByUserName,
  registerUsuario,
  updateUsuario,
} from "../api/user.api.js"

export const register = async (req, res) => {
  const {
    nombre,
    apellido,
    trabajo,
    email,
    username,
    departamento,
    rolUsuario,
    password,
    activo,
  } = req.body
  const paswordHash = await bcrypt.hash(password, 10)

  registerUsuario({
    nombre,
    apellido,
    trabajo,
    email,
    username,
    departamento,
    rolUsuario,
    password: paswordHash,
    activo,
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
  const { username, password } = req.body
  console.log(username, password)
  getUserByUserName(username)
    .then((response) => {
      if (!response.data)
        return res
          .status(400)
          .json({ message: "El usuario no existe", response })
      const userFound = response.data
      bcrypt.compare(password, userFound.password).then((isMatch) => {
        if (!isMatch)
          return res
            .status(400)
            .json({ message: "La contraseña es incorrecta" })
        crateAccessToken({
          idDB: userFound.id_Usuario, //pendiente a eliminar
          employeeId: userFound.id_Usuario, //pendiente a eliminar
          id: userFound.id_Usuario,
          departamentId: userFound.departamento.id,
          fullName: userFound.nombre + " " + userFound.apellido,
          roll: userFound.rolUsuario.id_rol, // int
        }).then((token) => {
          res.cookie("token", token)
          res.json({ message: "Sesión iniciada" })
        })
      })
    })
    .catch((error) => {
      error.response.status === 404
        ? res.status(404).json({ message: "No se encontró el usuario" })
        : res
            .status(error.response.status)
            .json({ message: "No se pudo iniciar sesión" })
    })
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
        username: response.data.username,
        nombre: response.data.nombre,
        apellido: response.data.apellido,
        trabajo: response.data.trabajo,
        departamento: response.data.departamento.titulo,
        rol: response.data.rolUsuario.rol,
        email: response.data.email,
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
export const updateUser = async (req, res) => {
  const userToUpdate = req.body

  const refinedUser = {}
  for (const key in userToUpdate) {
    if (userToUpdate[key] !== null) refinedUser[key] = userToUpdate[key]
  }
  console.log(userToUpdate, refinedUser)

  refinedUser.password
    ? (refinedUser.password = await bcrypt.hash(refinedUser.password, 10))
    : null
  updateUsuario(req.params.id, { ...refinedUser })
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

    const userFound = await getUser(user.id)
    if (!userFound) return res.status(401).json(["No autorizado"])
    return res.json({ message: "Autorizado", user: userFound.data })
  })
}
