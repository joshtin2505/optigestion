import { CreateUserForm } from '../components/Forms.jsx'
import '../assets/css/CreateUser.css'
import { BsArrowDownSquare, BsArrowUpSquare, BsPencilSquare, BsTrash } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
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
  const {getUsers} = useAuth()
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
  },[])
  return(
    <>
      <section>
        <ul>
          {
            users.map(user => {
              return(
                <li key={user._id}
                  className='user'
                >
                  <span>{user.firstName}</span>
                  <span>{user.lastName}</span>
                  <span>{user.job}</span>
                  <span>{user.id}</span>
                  <span>{user.user}</span>
                  <span>{user.departament}</span>
                  <span>{user.departamentId}</span>
                  <BsPencilSquare/>
                  <BsTrash/>
                </li>
              )
            })
        }
        </ul>
      </section>
    </>
  )
}
export default AdminOp