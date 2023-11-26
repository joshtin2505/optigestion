import { CreateUserForm } from '../components/Forms.jsx'
import '../assets/css/CreateUser.css'
import '../assets/css/ViewUsers.css'
import { BsArrowDownSquare, BsArrowUpSquare, BsPencilSquare, BsTrash } from 'react-icons/bs'
import { useContext, useEffect, useState } from 'react'
import { useAuth,AuthContext } from '../context/AuthContext.jsx'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
function AdminOp() {
  return (
    <>
      <CreateUser/>
      <Users/>
    </>
  )
}
function CreateUser() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='reg-true-cont'>
      <section className='reg-container'>
        <h1>Register</h1>
        {
          isOpen ? <BsArrowUpSquare className='open-reg' size={25} fill='#2b2b2b' cursor='pointer' onClick={() => setIsOpen(false)}/> : <BsArrowDownSquare className='open-reg' size={25} fill='#2b2b2b' cursor='pointer' onClick={() => setIsOpen(true)}/>
        }
        <div className={`body ${isOpen ? 'show': 'hidden'}`}>
          <CreateUserForm/>
          <aside>
            <h3>Roll</h3>
            <p className='roles'>0 = Admin</p>
            <p className='roles'> 1 = Rector</p>
            <p className='roles'> 2 = logistico</p>
            <p className='roles'> 3 = Operativo</p>
          </aside>
        </div>
      </section>
    </div>
  )
}
function Users (){
  
  const {getUsers,updateUser, userDelete} = useAuth()
  const  {render} =useContext(AuthContext)
  const [users, setUsers] = useState([])
  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const res = await getUsers()
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  },[render])
  
  const List = ({user, roll, fullName, index}) =>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
      <li 
      className={`user-card uc-${index}`}
      >
        <section className='user-infoCont'>
          <span className='user-info user-id'>{user.id}</span>
          <span className='user-div'>|</span>
          <span className='user-info user-name'>{fullName}</span>
          <span className='user-div'>|</span>
          <span className='user-info user-job'>{user.job}</span>
          <span className='user-div'>|</span>
          <span className='user-info user-nick'>{user.user}</span>
          <span className='user-div'>|</span>
          <span className='user-info user-departament'>{user.departament}</span>
          <span className='user-div'>-</span>
          <span className='user-info user-departament'>{user.departamentId}</span>
          <span className='user-div'>|</span>
          <span className='user-info user-departament'>{roll}</span>
        </section>
        <section className='admin-op-container'>
          <div className="admin-op" ><BsPencilSquare/></div>
          <div className="admin-op" onClick={() => onOpen()}><BsTrash/></div>

        </section>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar el Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>¿Estas seguro de eliminar el usuario?</p>
            <p>{fullName}</p>
            <button className='AO-delBtn AO-btn-cansel' onClick={onClose}>Cancelar</button>
            <button className='AO-delBtn AO-btn-del' onClick={()=>{
              userDelete(user._id)
              onClose()
            }}>Eliminar</button>
          </ModalBody>
        </ModalContent>
      </Modal>
      </li>
    )
  }
  return(
    <>
      <section className='users-container'>
        <div className="userCont">
          <section className='users-head'>
            <h1>Users</h1>
          </section>
          <ul className='users-card-container'>
            {
              users.map((user,index,users) => {
                const fullName = `${user.firstName} ${user.lastName}`
                const roll = user.roll === 0 ? 'Admin' : user.roll === 1 ? 'Rector' : user.roll === 2 ? 'Logistico' : user.roll === 3 ? 'Operativo' : 'No Role'
                
                return <List key={user._id} fullName={fullName} roll={roll} user={user} index={index} />
                
              })
          }
          </ul>
        </div>
      </section>
    </>
  )
}
export default AdminOp