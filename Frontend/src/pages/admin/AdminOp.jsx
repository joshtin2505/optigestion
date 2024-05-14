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
          <CreateUserForm />
          <aside>
            <h3>Roll</h3>
            <p className="roles">0 = Admin</p>
            <p className="roles"> 1 = Rector</p>
            <p className="roles"> 2 = logistico</p>
            <p className="roles"> 3 = Operativo</p>
          </aside>
        </div>
      </section>
    </div>
  )
}
// Muestra usuarios
function Users() {
  const { getUsers, newRender, setNewRender } = useAuth()
  const [users, setUsers] = useState([])
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
            {users.map((user, index) => {
              return <List key={index} user={user} index={index} />
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
const List = ({ user, index }) => {
  const { userDelete, setNewRender } = useAuth()
  const [openUpdateForm, setOpenUpdateForm] = useState("hide")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { id_Usuario, nombre, apellido, rolUsuario } = user
  const {rol} = rolUsuario
  console.log(user)
  const tituloDepartamento = user.departamento.titulo 
  console.log(tituloDepartamento)
  return (
    <>
      <li className={`user-card uc-${index}`}>
        <section className="user-infoCont">
          <span className="user-info user-id">{id_Usuario}</span>
          <span className="user-div">|</span>
          <span className="user-info user-name">{`${nombre} ${apellido}`}</span>
          <span className="user-div">|</span>
          <span className="user-info user-job">{user.trabajo}</span>
          <span className="user-div">|</span>
          <span className="user-info user-nick">{user.username}</span>
          <span className="user-div">|</span>
          <span className="user-info user-departament">{tituloDepartamento}</span> {/* TODO: fix this null*/}
          <span className="user-div">-</span>
          <span className="user-div">|</span>
          <span className="user-info user-departament">{rol ? 'no null' : 'null'}</span>{/* TODO: fix this null*/}
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
          <div className="admin-op" onClick={() => onOpen()}>
            <BsTrash />
          </div>
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
                  userDelete(user.id_Usuario)
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
          <UpdateUserForm idDB={user.id_Usuario} user={user} />
        </div>
      </section>
    </>
  )
}

export default AdminOp
