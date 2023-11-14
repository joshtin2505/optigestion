import {useForm} from 'react-hook-form'
import { registerRequest } from '../api/auth'
import { useState } from 'react'
function RegisterPage() {
  const {register, handleSubmit} = useForm()
  const [response, setResponse] = useState()

  return (
    <div className='reg-container'>
      <h1>Register</h1>
      <form action=""
        className='reg-form'
        onSubmit={handleSubmit( async (values) => {
          const res = await registerRequest(values)
          setResponse(res)
        } )}
      >
        <input type="text" {...register('firstName', {required: true})} placeholder='Nombre' />
        <input type="text" {...register('lastName', {required: true})} placeholder='Apellido'/>
        <input type="number" {...register('roll', {required: true})} placeholder='Roll'/>
        <input type="text" {...register('departament', {required: true})} placeholder='Departamento'/>
        <input type="text" {...register('job', {required: true})} placeholder='Puesto'/>
        <input type="number" {...register('departamentId', {required: true})} placeholder='ID de Departamento'/>
        <input type="text" {...register('user', {required: true})} placeholder='Usuario'/>
        <input type="number" {...register('id', {required: true})} placeholder='ID de Empleado'/>
        <input type="password" {...register('password', {required: true})} placeholder='Contraseña'/>
       
        <div className='btn-container'>
          <button type="submit">Register</button>
        </div>
        {
          response && <p className={response.data.status ?'succsess' : 'unSuccess'}>{response.data.status ? response.data.message : response.data.errorMessage }</p>
        }
        
        
      </form>
    </div>
  )
}

export default RegisterPage