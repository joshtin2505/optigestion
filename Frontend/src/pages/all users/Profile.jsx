import Nav from '../../components/Nav.jsx'
import '../../assets/css/Profile.css'
import { useAuth } from '../../context/AuthContext.jsx'
import { useEffect } from 'react'
function Profile() {

  const {getProfile,response} = useAuth()

  useEffect(() => {
    getProfile()
  },[])
  console.log(response)
  return (
    <div className='profile-real-cont'>
      <Nav type={1}/>
      <section className='profile'>
        <h1>Perfil</h1>
        <p className='profile-p'>Nombre: <span className='names'>{response.firstName}</span></p>
        <p className='profile-p'>Apellidos: <span className='names'>{response.lastName}</span></p>
        <p className='profile-p'>id: <span className=''>{response.id}</span></p>
        <p className='profile-p'>User: <span className=''>{response.user}</span></p>
        <p className='profile-p'>Empleo/Puesto: <span className=''>{response.job}</span></p>
      </section>
    </div>
  )
}

export default Profile