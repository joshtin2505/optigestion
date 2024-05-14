import Nav from '../../components/Nav.jsx'
import '../../assets/css/Profile.css'
import useAuth from '../../hooks/useAuth.js'
import { useEffect } from 'react'
function Profile() {

  const {getProfile,response} = useAuth()

  useEffect(() => {
    getProfile()
  },[])
  const {nombre, apellido, trabajo, email, username} = response.user
  return (
    <div className='profile-real-cont'>
      <Nav type={1}/>
      <section className='profile'>
        <h1>Perfil</h1>
        <p className='profile-p'>Nombre: <span className='names'>{nombre}</span></p>
        <p className='profile-p'>Apellidos: <span className='names'>{apellido}</span></p>
        <p className='profile-p'>Email: <span className=''>{email}</span></p>
        <p className='profile-p'>User: <span className=''>{username}</span></p>
        <p className='profile-p'>Empleo/Puesto: <span className=''>{trabajo}</span></p>
      </section>
    </div>
  )
}

export default Profile