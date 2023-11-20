import Nav from '../components/Nav.jsx'
import '../assets/css/CreateReq.css'
import {useForm} from 'react-hook-form'
import { useReq } from '../context/ReqContext.jsx'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {useState} from 'react'

function CrearSolicitud() {
  

  return (
    <div className='back'>
      <Nav type={1}/>
      <section className='CR-box-cont'>
          <CreateReqForm />

      </section>
    </div>
  )
}

export const CreateReqForm = () => {
  const {createReq, sendInNewReq} = useReq()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sendSuccess, setSendSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState:{
      errors
    },
    reset,
    setValue,
    watch
  } = useForm()

 
  const onSubmit = handleSubmit((values)=>{
    createReq(values)
    reset()
    onOpen()
  })
  const onSend = () => {
    const title = watch('title')
    const description = watch('description')
    sendInNewReq({
      title,
      description,
    })
    reset()
    setSendSuccess(true)
  }

  if(sendSuccess === true){
    setTimeout(() => {
      setSendSuccess(false)
    },5000)
  }
  return(
    <>
    <div className='CR-container'>
      <h2>Solicitud</h2>
      <form className='form-Create formTwo' action="" onSubmit={onSubmit}>
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input type="text" {...register('title',{
            required: true,
            min: 5
          })}
          onChange={(e) => setValue('title', e.target.value)}
          autoFocus />
        </div>
        {
          errors.title && (
            <div className="error">Se necita un titulo </div>
          )
        }
        <br />
        <label htmlFor="">Descripcion:</label>
        <br />
        <textarea {...register('description', {
          required: true
        })}
        onChange={(e) => setValue('description', e.target.value)}
        ></textarea>
        {
          errors.description && (
            <div className="error">Se necita una descripción</div>
          )
        }
        <div>
          <div className="btnOptions">
          <button type='reset' className='btnClear'>Limpiar Campos</button>
          <button type='submit' className='btnSave'>Guardar</button>
          <button type='button' onClick={onSend} className='btnSend'>Enviar</button>
          </div>
        </div>
      </form>
      {
        sendSuccess && (
          <Alert status='success'>
            <AlertIcon />
            <AlertTitle>Solicitud Enviada!</AlertTitle>
            <AlertDescription>Tu Solicitud ha sido enviada con exito.</AlertDescription>
          </Alert>
        )
      }
      <Modal onClose={onClose} isOpen={isOpen} >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Solcitud Guardada</ModalHeader>
              <ModalBody>
                <Link style={{
                  "background": "#6b6b6b",
                  "padding": "8px 5px",
                  color: "#fff",
                  "borderRadius": "4px",
                }} to='/'>
                  Volver a Inicio
                </Link>
                <Link style={{
                  "background": "#6b6b6b",
                  "padding": "8px 5px",
                  color: "#fff",
                  "borderRadius": "4px",
                  "margin": "10px"
                }} to='/req-draft'>
                  ver Solicitud
                </Link>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
      </div>
    </>
  )
 

 
}
export const UpdateReqForm = (data) => {
  const {updateReq, sendSavedReq} = useReq()
  const [inValues, setInValues] = useState({
    title: data.data.title,
    description: data.data.description
  })
  const {
    register,
    handleSubmit,
    formState:{
      errors
    },
    setValue,
    watch
  } = useForm()

  const onSubmit = handleSubmit((values)=>{
    updateReq({id :data.data._id,...values})
  })
  const onSend = () => {
    sendSavedReq(data.data._id)
  }
  const handleChange = (e) => {
    const title = watch('title')
    const description = watch('description')
    setInValues({
      title,
      description
    })
  }
  return(
    <>
    <form className='form-Update formTwo' onChange={handleChange}  onSubmit={onSubmit}>
      <div className='head'>
        <label htmlFor="">Titulo:</label>
        <input 
        type="text" 
        onChange={(e) => setValue('title', e.target.value)} 
        value={inValues.title} 
        {...register('title',{
          required: true,
          min: 5
        })}
        autoFocus 
        />
      </div>
      {
        errors.title && (
          <div className="error">Se necita un titulo </div>
        )
      }
      <br />
      <label htmlFor="">Descripcion:</label>
      <br />
      <textarea 
      onChange={(e) => {setValue('description', e.target.value)}}
      value={inValues.description} 
      {...register('description', {
        required: true
      })} ></textarea>
      {
        errors.description && (
          <div className="error">Se necita una descripción</div>
        )
      }
      <div>
        <div className="btnOptions">
        <button type='submit' className='btnSave'>Guardar</button>
        <button type='button' onClick={onSend} className='btnSend'>Enviar</button>
        </div>
      </div>
    </form>
    
    </>
  )
}
export const ViewReqForm = (data) => {

  return(
    <>
    <form className='form-view formTwo'>
      <div className='head'>
        <label htmlFor="">Titulo:</label>
        <input
        disabled 
        value={data.data.title} 
        />
        <label htmlFor="">Estado:</label>
      </div>
      <br />
      <label htmlFor="">Descripcion:</label>
      <br />
      <textarea 
      disabled 
      value={data.data.description} 
      ></textarea>
    </form>
    
    </>
  )
}
export default CrearSolicitud