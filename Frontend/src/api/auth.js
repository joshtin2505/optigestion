import axios from './axios.js'



export const register = (user) => axios.post('/register', user)
export const users = () => axios.get('/users')
export const update = (id, user) => axios.put('/update/' + id, user)
export const deleteUser = (id) => axios.delete('/delete/' + id)

export const login = (user)=> axios.post('/login', user)

export const verifyToken = () => axios.get('/verify')

export const logout = () => axios.post('/logout')

export const profile = () => axios.get('/profile')
