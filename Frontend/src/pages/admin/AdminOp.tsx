import { CreateUserForm, UpdateUserForm } from "../../components/Forms.jsx"
import "../../assets/css/CreateUser.css"
import "../../assets/css/ViewUsers.css"
import {
  BsArrowClockwise,
  BsArrowDownSquare,
  BsArrowUpSquare,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs"
import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth.js"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import React from "react"
import type { Usuario } from "../../types.d.ts"
import { departament, role } from "../../api/extras.js"
// Renderiza todo el dashboard de el Administrador
function AdminOp() {
  return (
    <>
      <CreateUser />
      <Users />
    </>
  )
}
// Registro de usuarios
function CreateUser() {
  const [isOpen, setIsOpen] = useState(false)
  const [roles, setRoles] = useState([])
  const [departaments, setDepartaments] = useState([])
  useEffect(() => {
    role().then((res) => setRoles(res.data))
    departament().then((res) => setDepartaments(res.data))
  }, [])
  return (
    <div className="reg-true-cont">
      <section className="reg-container">
        <h1>Register</h1>
        {/* abrir el form registro de usuarios */}
        {isOpen ? (
          <BsArrowUpSquare
            className="open-reg"
            size={25}
            fill="#2b2b2b"
            cursor="pointer"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <BsArrowDownSquare
            className="open-reg"
            size={25}
            fill="#2b2b2b"
            cursor="pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
        <div className={`body ${isOpen ? "show" : "hidden"}`}>
          <CreateUserForm roles={roles} departaments={departaments} />
        </div>
      </section>
    </div>
  )
}
// Muestra usuarios
function Users() {
  const { getUsers, newRender, setNewRender } = useAuth()
  const [users, setUsers] = useState<Usuario[] | []>([])
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers()
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (newRender === true || refresh === true) {
      setTimeout(() => {
        setNewRender(false)
        setRefresh(false)
        fetchUsers()
      }, 300)
    }
  }, [newRender, refresh])

  return (
    <>
      <section className="users-container">
        <div className="userCont">
          <section className="users-head">
            <h1>Users</h1>
            <button
              onClick={() => setRefresh(true)}
              className="user-refresh-btn"
            >
              <span>Refresh</span>
              <BsArrowClockwise size={20} fill="#6b6b6b" />
            </button>
          </section>
          <ul className="users-card-container">
            {users.length > 0 ? (
              users.map((user: Usuario, index: number) => {
                return <UserCard key={index} user={user} index={index} />
              })
            ) : (
              <h1>No hay usuarios</h1>
            )}
          </ul>
        </div>
      </section>
    </>
  )
}
const UserCard = ({ user, index }: { user: Usuario; index: number }) => {
  const { userDelete, setNewRender } = useAuth()
  const [openUpdateForm, setOpenUpdateForm] = useState("hide")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [roles, setRoles] = useState([])
  const [departaments, setDepartaments] = useState([])
  useEffect(() => {
    role().then((res) => setRoles(res.data))
    departament().then((res) => setDepartaments(res.data))
  }, [])

  const { id_Usuario, nombre, apellido, rolUsuario, departamento } = user
  const rol = rolUsuario?.rol ? rolUsuario?.rol : ""
  return (
    <>
      <li className={`user-card uc-${index}`}>
        <section className="user-infoCont">
          <span className="user-info user-name">{`${nombre} ${apellido}`}</span>
          <span className="user-div">|</span>
          <span className="user-info user-nick">{user?.username}</span>
          <span className="user-div">|</span>
          <span className="user-info user-nick">{user?.email}</span>
          <span className="user-div">|</span>
          <span className="user-info user-job">{user?.trabajo}</span>
          <span className="user-div">|</span>
          <span className="user-info user-departament">
            {departamento?.titulo}
          </span>
          <span className="user-div">|</span>
          <span className="user-info user-departament">{rol}</span>
        </section>
        <section className="admin-op-container">
          <div
            className="admin-op"
            onClick={() => {
              setOpenUpdateForm(openUpdateForm === "" ? "hide" : "")
            }}
          >
            <BsPencilSquare />
          </div>
          <button
            className="admin-op"
            onClick={() => onOpen()}
            disabled
            style={{
              opacity: 0.5,
              cursor: "not-allowed",
            }}
          >
            <BsTrash />
          </button>
        </section>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Eliminar el Usuario</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>¿Estas seguro de eliminar el usuario?</p>
              <p>{`${nombre} ${apellido}`}</p>
              <button className="AO-delBtn AO-btn-cansel" onClick={onClose}>
                Cancelar
              </button>
              <button
                className="AO-delBtn AO-btn-del"
                onClick={() => {
                  userDelete(id_Usuario)
                  setNewRender((oldRender) => !oldRender)
                  onClose()
                }}
              >
                Eliminar
              </button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </li>
      <section className={"updateCont " + openUpdateForm}>
        <div className="updateUserCont">
          <h3>Update User</h3>
          <UpdateUserForm
            user={user}
            departaments={departaments}
            roles={roles}
          />
        </div>
      </section>
    </>
  )
}

export default AdminOp
