import { Link } from "react-router-dom"
import {useForm} from 'react-hook-form'
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
function Login() {
    const {register, 
        handleSubmit,
        formState:{
          errors
        }
      } = useForm()

      const {singIn, errors: signInErr, isAutenticated} = useAuth()

      const navigate = useNavigate()


      const onSubmit = handleSubmit(data => {
        singIn(data)
      })
      useEffect(() => {
        if (isAutenticated) navigate('/req-manager')
        if (!isAutenticated) navigate('/')
      }, [isAutenticated])
  return (
    <div className="login-container">
        <div className="title-container">
            <h1 className="title-login">Iniciar Sesión</h1>
        </div>
        <form  onSubmit={onSubmit}>
            <label htmlFor="usuario">Usuario</label>
            <input {...register("user", {required: true})} className="userIn" type="text" />
            {
            errors.user && (
              <p style={{"color": "#dc2626", "fontWeight": "600"}}>usuario requerido</p>
            )
            }
            <label htmlFor="contraseña">Contraseña</label>
            <input {...register("password", {required: true})} className="passwordIn" type="password" />
            {
            errors.password && (
              <p style={{"color": "#dc2626", "fontWeight": "600"}}>Contraseña requerido</p>
            )
          }
            <div className="pre-btn" hidden>
                
                <Link to='change-Password'>Olvidé mi contraseña</Link>
            </div>
            <div className="btn-submit-container">
                <button className="btn-submit" type="submit">Iniciar Sesión</button>
            </div>
        </form>
        {
          signInErr.map((err, i)=> (
            <div className='unSuccsess' key={i}>
              {err}
            </div>
          ))
        }
    </div>
  )
}

export default Login