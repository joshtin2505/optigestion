import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext.jsx'

function RegisterPage() {
  const {register, 
    handleSubmit,
    formState:{
      errors
    }
  } = useForm()
  const {singUp, isAutenticated, errors: registerErrors} = useAuth() 


  const onSubmit = handleSubmit( async (values) => {
    singUp(values)
  } )
  return (
    <div className='reg-container'>
      <h1>Register</h1>
      <form action=""
        className='reg-form'
        onSubmit={onSubmit}
      >
        <div className="dual">
          <input type="text" {...register('firstName', {required: true})} placeholder='Nombre' />
          {
            errors.firstName && (
              <p style={{"color": "#dc2626", "fontWeight": "600"}}>nombre requerido</p>
              )
            }
          <input type="text" {...register('lastName', {required: true})} placeholder='Apellido'/>
          {
            errors.lastName && (
              <p style={{"color": "#dc2626", "fontWeight": "600"}}>apellido requerido</p>
              )
            }
        </div>
        <hr />
        <div className="third">
          <input type="text" {...register('job', {required: true})} placeholder='Puesto'/>

          <input type="number" {...register('id', {required: true})} placeholder='ID de Empleado'/>

          <input type="number" max='3' min='1' {...register('roll', {required: true})} placeholder='Roll'/>
          {
            errors.job && (
              <p style={{"color": "#dc2626", "fontWeight": "600"}}>Puesto requerido</p>
            )
          }
                    {
            errors.id && (
              <p style={{"color": "#dc2626", "fontWeight": "600"}}>ID de Empleado requerido</p>
            )
          }
          {
            errors.roll && (
              <p style={{"color": "#dc2626", "fontWeight": "600"}}>roll requerido</p>
              )
            }
        </div>
        <hr />
        <div className="dual">
          <input type="text" {...register('departament', {required: true})} placeholder='Departamento'/>
          {
            errors.departament && (
              <p style={{"color": "#dc2626", "fontWeight": "600"}}>departamento requerido</p>
              )
            }
            <input type="number" {...register('departamentId', {required: true})} placeholder='ID de Departamento'/>
          {
            errors.departamentId && (
              <p style={{"color": "#dc2626", "fontWeight": "600"}}>ID de Departamento requerido</p>
            )
          }
        </div>
        <hr />
        <div className="dual">
          <input type="text" {...register('user', {required: true})} placeholder='Usuario'/>
          {
            errors.user && (
              <p style={{"color": "#dc2626", "fontWeight": "600"}}>Usuario requerido</p>
            )
          }
          <input type="password" {...register('password', {required: true})} placeholder='Contraseña'/>
          {
            errors.password && (
              <p style={{"color": "#dc2626", "fontWeight": "600"}}>Contraseña requerido</p>
            )
          }
        </div>
        <div className='btn-container'>
          <button type="submit">Register</button>
        </div>

        {
          registerErrors.map((err, i)=> (
            <div className='unSuccsess' key={i}>
              {err}
            </div>
          ))
        }
        
      </form>
    </div>
  )
}

export default RegisterPage