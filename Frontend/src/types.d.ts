export interface Usuario {
  id_Usuario: number
  nombre: string
  apellido: string
  trabajo: string
  email: string
  username: string
  password: string
  departamento: {
    id: number
    titulo: string
    descripcion: string
  }
  rolUsuario: {
    id_rol: number
    rol: string
    descripcion: string
  }
}
