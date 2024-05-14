import Nav from "../../components/Nav.jsx"
import "../../assets/css/Profile.css"
import useAuth from "../../hooks/useAuth.js"
import { useEffect, useState } from "react"
function Profile() {
  const { getProfile} = useAuth()
  const [response, setResponse] = useState({})

  useEffect(() => {


    async function fetchProfile () {
      getProfile().then((res) => setResponse(res.data)).catch((err) => console.log(err))
    }
    fetchProfile()
  }, [])
  const { nombre, apellido, trabajo, email, username, departamento } = response
  return (
    <div className="profile-real-cont">
      <Nav type={1} />
      {response && (
        <section className="profile">
          <h1>Perfil</h1>
          <p className="profile-p">
            Nombre: <span className="names">{nombre ?? "Loading..."}</span>
          </p>
          <p className="profile-p">
            Apellidos: <span className="names">{apellido ?? "Loading..."}</span>
          </p>
          <p className="profile-p">
            Email: <span className="">{email ?? "Loading..."}</span>
          </p>
          <p className="profile-p">
            User: <span className="">{username ?? "Loading..."}</span>
          </p>
          <p className="profile-p">
            Departamento: <span className="">{departamento ?? "Loading..."}</span>
          </p>
          <p className="profile-p">
            Empleo/Puesto: <span className="">{trabajo ?? "Loading..."}</span>
          </p>
        </section>
      )}
    </div>
  )
}

export default Profile
