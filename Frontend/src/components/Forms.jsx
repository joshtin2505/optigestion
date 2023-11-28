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
  ModalCloseButton
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import { BsCloudUpload, BsDownload } from 'react-icons/bs'
import { useAuth } from '../context/AuthContext.jsx'
import '../assets/css/Approved.css'
import '../assets/css/ToQuote.css'
import '../assets/css/ViewPdf.css'

export const CreateUserForm = () => {
  const [modalName, setModalName] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {register, 
    handleSubmit,
    formState:{
      errors
    }
  } = useForm()
  const {singUp,setNewRender} = useAuth() 


  const onSubmit = handleSubmit( async (values) => {
    const res = await singUp(values)
    if (res.data.message) setModalName(res.data.message)
    setNewRender(true)
    res.status == 200 ? onOpen() : null
  } )
  return (
    <form action=""
    className='reg-form'
    onSubmit={onSubmit}
  >
    <div className="dual">
      <input className='RU-input' type="text" {...register('firstName', {required: true})} placeholder='Nombre' />
      {
        errors.firstName && (
          <p style={{"color": "#dc2626", "fontWeight": "600"}}>nombre requerido</p>
          )
        }
      <input className='RU-input' type="text" {...register('lastName', {required: true})} placeholder='Apellido'/>
      {
        errors.lastName && (
          <p style={{"color": "#dc2626", "fontWeight": "600"}}>apellido requerido</p>
          )
        }
    </div>
    <hr />
    <div className="third">
      <input className='RU-input' type="text" {...register('job', {required: true})} placeholder='Puesto'/>

      <input className='RU-input' type="number" {...register('id', {required: true})} placeholder='ID de Empleado'/>

      <input className='RU-input' type="number" max='3' min='0' {...register('roll', {required: true})} placeholder='Roll'/>
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
      <input className='RU-input' type="text" {...register('departament', {required: true})} placeholder='Departamento'/>
      {
        errors.departament && (
          <p style={{"color": "#dc2626", "fontWeight": "600"}}>departamento requerido</p>
          )
        }
        <input className='RU-input' type="number" {...register('departamentId', {required: true})} placeholder='ID de Departamento'/>
      {
        errors.departamentId && (
          <p style={{"color": "#dc2626", "fontWeight": "600"}}>ID de Departamento requerido</p>
        )
      }
    </div>
    <hr />
    <div className="dual">
      <input className='RU-input' type="text" {...register('user', {required: true})} placeholder='Usuario'/>
      {
        errors.user && (
          <p style={{"color": "#dc2626", "fontWeight": "600"}}>Usuario requerido</p>
        )
      }
      <input className='RU-input' type="password" {...register('password', {required: true})} placeholder='Contraseña'/>
      {
        errors.password && (
          <p style={{"color": "#dc2626", "fontWeight": "600"}}>Contraseña requerido</p>
        )
      }
    </div>
    <div className='btn-container'>
      <button type="submit">Register</button>
    </div>
    <Modal onClose={onClose} isOpen={isOpen} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalName}</ModalHeader>
        <ModalBody>
          <button style={{
            background: 'cyan',
            padding: '0 10px',
            borderRadius: '4px'
          }} onClick={()=>{
            
            onClose()
          }} className='okbtn'>Ok</button>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
    
    
  </form>
  )
}
export const UpdateUserForm = ({idDB, user}) => {
  const [modalName, setModalName] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userData, setUserData] = useState([
    user.firstName,
    user.lastName,
    user.job,
    user.id,
    user.roll,
    user.departament,
    user.departamentId,
    user.user,
    ''
  ])
  const {register, 
    handleSubmit,
    setValue,
    watch
  } = useForm()
  const {updateUser,setNewRender} = useAuth() 
  
  const onChange = () => {
    setUserData([
      watch('firstName'),
      watch('lastName'),
      watch('job'),
      watch('id'),
      watch('roll'),
      watch('departament'),
      watch('departamentId'),
      watch('user'),
      watch('password'),      
    ])
  }
  const onSubmit = handleSubmit( async (values) => {
    const departament = !values.departament ? user.departament : values.departament
    const departamentId = !values.departamentId ? Number(user.departamentId) : Number(values.departamentId)
    const firstName = !values.firstName ? user.firstName : values.firstName
    const lastName = !values.lastName ? user.lastName : values.lastName
    const job = !values.job ? user.job : values.job
    const roll = !values.roll ? Number(user.roll) : Number(values.roll)
    const userName = !values.user ? user.user : values.user
    const id = !values.id ? Number(user.id) : Number(values.id)
    if (values.password){
      const res = await updateUser(idDB,{
        departament,
        departamentId,
        firstName,
        lastName,
        job,
        roll,
        user: userName,
        id,
        password: values.password
      })
      if (res.data.message) setModalName(res.data.message)
      setNewRender(true)
      res.status == 200 ? onOpen() : null
    }
    else{
      const res = await updateUser(idDB,{
        departament,
        departamentId,
        firstName,
        lastName,
        job,
        roll,
        user: userName,
        id
      })
      if (res.data.message) setModalName(res.data.message)
      setNewRender(true)
      res.status == 200 ? onOpen() : null
    }

  } )
  return (
    <form action=""
    className='upd-form'
    onSubmit={onSubmit}
    noValidate
    onChange={onChange}
  >
    <div className="dual">
      <input className='RU-input' type="text" {...register('firstName')} placeholder='Nombre' onChange={(e) => setValue('firstName', e.target.value)} value={userData[0]}/>
      
      <input className='RU-input' type="text" {...register('lastName')} placeholder='Apellido' onChange={(e) => setValue('lastName', e.target.value)} value={userData[1]}/>
       
    </div>
    <hr />
    <div className="third">
      <input className='RU-input' type="text" {...register('job')} placeholder='Puesto' onChange={(e) => setValue('job', e.target.value)} value={userData[2]}/>

      <input className='RU-input' type="number" {...register('id')} placeholder='ID de Empleado' onChange={(e) => setValue('id', e.target.value)} value={userData[3]}/>

      <input className='RU-input' type="number" max='3' min='0' {...register('roll')} placeholder='Roll' onChange={(e) => setValue('roll', e.target.value)} value={userData[4]}/>
      
      
       
    </div>
    <hr />
    <div className="dual">
      <input className='RU-input' type="text" {...register('departament')} placeholder='Departamento' onChange={(e) => setValue('departament', e.target.value)} value={userData[5]}/>
      
        <input className='RU-input' type="number" {...register('departamentId')} placeholder='ID de Departamento' onChange={(e) => setValue('departamentId', e.target.value)} value={userData[6]}/>
      
    </div>
    <hr />
    <div className="dual">
      <input className='RU-input' type="text" {...register('user')} placeholder='Usuario' onChange={(e) => setValue('user', e.target.value)} value={userData[7]}/>
      
      <input className='RU-input' type="password" {...register('password')} placeholder='Contraseña' onChange={(e) => setValue('password', e.target.value)} value={userData[8]}/>
      
    </div>
    <div className='btn-container'>
      <button type="submit">Actualizar</button>
    </div>
    <Modal onClose={onClose} isOpen={isOpen} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalName}</ModalHeader>
        <ModalBody>
          <button style={{
            background: 'cyan',
            padding: '0 10px',
            borderRadius: '4px'
          }} onClick={()=>{
            
            onClose()
          }} className='okbtn'>Ok</button>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
    
    
  </form>
  )
}
export const CreateReqForm = () => {
    const {createReq, sendInNewReq} = useReq()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sendSuccess, setSendSuccess] = useState(false)
    const {
      register,
      handleSubmit,
      formState: {
        errors,
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
  export const ResReqForm = (data) => {
    const {sendRectorRes, } = useReq()
    const [inValues, setInValues] = useState()
    const {
      setValue,
      watch
    } = useForm()
  
    const onApprove = ()=> {
      sendRectorRes({id :data.data._id,rectorComment:inValues, res: 1})
    }
    const onReject = () => {
      sendRectorRes({id :data.data._id,rectorComment:inValues, res: 0})
    }
    const handleChange = (e) => {
      const rectorComment = watch('rectorComment')
      setInValues(rectorComment)
    }
    return(
      <>
      <form className='form-Update formTwo' onChange={handleChange}>
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input 
          type="text" 
          value={data.data.title} 
          disabled 
          />
        </div>

        <br />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }} className="body">

          <label style={{
            width: 'auto',
            textalign: 'start',
          }} htmlFor="">Descripcion:</label>
          <textarea style={{
            height: 'auto',
          }}
          className='textarea-Res '
          value={data.data.description} 
          disabled
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }} className="body">

          <label style={{
            width: 'auto',
            textalign: 'start',
          }} htmlFor="">Comentarios:</label>
          <textarea style={{
            height: 'auto',
          }}
          className='textarea-Res '
          onChange={(e) => {setValue('rectorComment', e.target.value)}}
          autoFocus
          />
        </div>

        <div>
          <div className="btnOptions">
            <button type='button' onClick={onReject} className='btnSend'>Rechazar</button>
            <button type='button' onClick={onApprove} className='btnSave'>Aprobar</button>
          </div>
        </div>
      </form>
      
      </>
    )
  }
  export const ToQuoteResForm = ({data, setUpdateComponent}) => {

    const [pdfs, setPdfs] = useState([null, null, null])
    const [fileNames, setFileNames] = useState(['No hay archivos cargados', 'No hay archivos cargados', 'No hay archivos cargados'])
    const {LogisticRes} = useReq()
    
    const handleFileChange = (index, files) => {
      if (files[0]) {
        setFileNames((prevNames) => {
          const newNames = [...prevNames]
          newNames[index] = files[0].name
          return newNames
        })
        setPdfs((prevPdfs) => {
          const newPdfs = [...prevPdfs]
          newPdfs[index] = files[0]
          return newPdfs
        })
      }
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    const [pdf1, pdf2, pdf3] = pdfs
    if (pdf1 || pdf2 || pdf3) {
      const formData = new FormData()

      setUpdateComponent(prevValue => prevValue + 1)


      formData.append('id', data._id)
      pdf1 && formData.append('pdf1', pdf1)
      pdf2 && formData.append('pdf2', pdf2)
      pdf3 && formData.append('pdf3', pdf3)

      LogisticRes(formData)
    }
  }

    return(
      <>
      <form encType="multipart/form-data" className='form-Update formTwo' onSubmit={handleSubmit}>
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input 
          type="text" 
          value={data.title} 
          disabled 
          />
        </div>

        <br />
        <section className="TQ-content">
          <div className="TQ-Description-cont">

            <label style={{
              width: 'auto',
              textalign: 'start',
            }} htmlFor="">Descripcion:</label>
            <textarea style={{
              height: 'auto',
            }}
            className='textarea-Res '
            value={data.description} 
            disabled
            />
            </div>
            <div className="TQ-RectorComments-cont">

            <label style={{
              width: 'auto',
              textalign: 'start',
            }} htmlFor="">Comentarios:</label>
            <textarea style={{
              height: 'auto',
            }}
            value={data.rectorComment}
            className='textarea-Res'
            disabled
            />
          </div>
        </section>
        {/*  */}
        <div>
          <h1>Cotizacones</h1>
          <hr />
          <section className='TQ-middle-section'>
          {[0, 1, 2].map((index) => (
            <div className='TQ-toQuote-Box' key={index}>
              <div
                className='TQ-btn-pdf-cont'
                onClick={() => document.querySelector(`.option${index + 1}In`).click()}
              >
                <h5 className='TQ-title-op'>{`Opcion ${index + 1}`}</h5>
                <input
                  type='file'
                  accept='.pdf'
                  className={`option${index + 1}In`}
                  hidden
                  multiple={false}
                  onChange={({ target: { files } }) => handleFileChange(index, files)}
                  name={`pdf${index + 1}`}
                />
                <BsCloudUpload fill='#ececec' size={50} />
                <p className='TQ-pdf-name'>{fileNames[index]}</p>
              </div>
            </div>
          ))}
        </section>
          {/*  */}
          
        </div>
        {/*  */}
        <div className='TQ-btnCont'>
          <div className="TQ-btnOptions">
            <button type='submit' className='TQ-btnSend'>Enviar</button>
          </div>
        </div>
      </form>
      
      </>
    )
  }
  export const ViewToBuyResForm = (data) => {
    
    function Quote({req}){
      const request = req.data
      const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
      const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
      const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure()
      function PdfView({url, title, isOpen, onClose, onOpen}) {
        return (
          <>
            <Modal size={'full'} isCentered motionPreset='slideInBottom' isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                <iframe className='pdf' src={url} frameborder="0"></iframe>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )
      }
      return (
        <>
          <form>
            <h1>Cotizacones</h1>
            <hr />
            <section className='A-middle-section'>
              {
                [1,2,3].map((index)=> {
                  const value = index === 1 ? request.firstPrices
                  : index === 2 ? request.secondPrices 
                  : request.thirdPrices
                  const nameValue = index === 1 ? request.firstPricesName
                  : index === 2 ? request.secondPricesName 
                  : request.thirdPricesName
                  const toBuffer = Uint8Array.from(value.data).buffer
                  const blob = new Blob([
                    toBuffer
                  ],{type: 'application/pdf'})
                  const url = window.URL.createObjectURL(blob)
                  const PdfViewerProps = {
                    url,
                    title: nameValue,
                    isOpen: index === 1 ? isOpen1 : index === 2 ? isOpen2 : isOpen3,
                    onOpen: index === 1 ? onOpen1 : index === 2 ? onOpen2 : onOpen3,
                    onClose: index === 1 ? onClose1 : index === 2 ? onClose2 : onClose3,
                  }
                  return(
                    <div className="A-toQuote-Box" key={index}>
                      <h5 className='A-title-op'>Opcion {index}</h5>
                      <p className='A-pdf-name'>
                        {
                          nameValue
                        }
                      </p>
                      <PdfView {...PdfViewerProps} />
                      <div className='A-btn-pdf-cont'>
                        <button onClick={index === 1 ? onOpen1 : index === 2 ? onOpen2 : onOpen3} className='A-btn-view' type='button'>Ver</button>
                        <a href={url} download={`cotizacion_${nameValue}`} target='_blank' className='A-btn-download'>
                          <BsDownload size={20} fill='#fff'/>
                        </a>
                      </div>
                    </div>
                  ) 
                })
              }
            </section>
            {/*  */}
            <section className='A-down-section'>
              <h5 className='A-operative-comments-txt'>Comentarios: </h5>
              <textarea className='A-operative-comments-in' value={request.toBuyComments} disabled/>
              <div className='A-chose-cont'>
                <h6 className='A-chose-title'>Comprar</h6>
                <h6 className='A-chose-title'>Opcion {request.choise}</h6>
                  
              </div>
            </section>
            {/*  */}
            <div className='A-btnCont'/>
          </form>
        </>
      )
    }
    return(
      <>
      <section className='form-Update formTwo' >
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input 
          type="text" 
          value={data.data.title} 
          disabled 
          />
        </div>
        <br />
        <section className="A-content">
          <div className="A-Description-cont">

            <label style={{
              width: 'auto',
              textalign: 'start',
            }} htmlFor="">Descripcion:</label>
            <textarea style={{
              height: 'auto',
            }}
            className='textarea-Res '
            value={data.data.description} 
            disabled
            />
            </div>
            <div className="A-RectorComments-cont">

            <label style={{
              width: 'auto',
              textalign: 'start',
            }} htmlFor="">Comentarios:</label>
            <textarea style={{
              height: 'auto',
            }}
            value={data.data.rectorComment}
            className='textarea-Res'
            disabled
            />
          </div>
        </section>
        {/*  */}
          <Quote req={data}/>        
      </section>
      
      </>
    )
  }
  export const ViewApprovedResForm = (data) => {
    const {setChosenQuote} = useReq()
    
    function Quote({req}){
      const request = req.data
      const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
      const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
      const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure()

      function PdfView({url, title, isOpen, onClose, onOpen}) {
        return (
          <>
            <Modal size={'full'} isCentered motionPreset='slideInBottom' isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                <iframe className='pdf' src={url} frameborder="0"></iframe>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )
      }
      const {register, handleSubmit, formState: {
        errors
      }} = useForm()
      const onSubmit = handleSubmit((values)=>{
        setChosenQuote({id:request._id, ...values})
      })
      return (
        <>
          <form onSubmit={onSubmit}>
            <h1>Cotizacones</h1>
            <hr />
            <section className='A-middle-section'>
              {
                [1,2,3].map((index)=> {
                  const value = index === 1 ? request.firstPrices
                  : index === 2 ? request.secondPrices 
                  : request.thirdPrices
                  const nameValue = index === 1 ? request.firstPricesName
                  : index === 2 ? request.secondPricesName 
                  : request.thirdPricesName
                  const toBuffer = Uint8Array.from(value.data).buffer
                  const blob = new Blob([
                    toBuffer
                  ],{type: 'application/pdf'})
                  const url = window.URL.createObjectURL(blob)
                  const PdfViewerProps = {
                    url,
                    title: nameValue,
                    isOpen: index === 1 ? isOpen1 : index === 2 ? isOpen2 : isOpen3,
                    onOpen: index === 1 ? onOpen1 : index === 2 ? onOpen2 : onOpen3,
                    onClose: index === 1 ? onClose1 : index === 2 ? onClose2 : onClose3,
                  }
                  return(
                    <div className="A-toQuote-Box" key={index}>
                      <h5 className='A-title-op'>Opcion {index}</h5>
                      <p className='A-pdf-name'>
                        {
                          nameValue
                        }
                      </p>
                      <PdfView {...PdfViewerProps}/>
                      <div className='A-btn-pdf-cont'>
                        <button onClick={index === 1 ? onOpen1 : index === 2 ? onOpen2 : onOpen3} className='A-btn-view' type='button'>Ver</button>
                        <a href={url} download={`cotizacion_${nameValue}`} target='_blank' className='A-btn-download'>
                          <BsDownload size={20} fill='#fff'/>
                        </a>
                      </div>
                    </div>
                  ) 
                })
              }
            </section>
            {/*  */}
            <section className='A-down-section'>
              <h5 className='A-operative-comments-txt'>Comentarios: </h5>
              <textarea className='A-operative-comments-in' {...register('toBuyComments')}/>
              <div className='A-chose-cont'>
                <h6 className='A-chose-title'>Elige</h6>
                  <div className='A-chose-option'>
                    <div className="boxRadio">
                      <input className='A-radio-chose' type="radio" {...register('choise', {required: true})} value='1'/>
                    </div>
                    <span className='A-chose-opt-txt'>Opcion 1</span>
                  </div>
                  <div className='A-chose-option'>
                    <div className="boxRadio">
                      <input className='A-radio-chose' type="radio" {...register('choise', {required: true})} value='2'/>
                    </div>
                    <span className='A-chose-opt-txt'>Opcion 2 </span>
                  </div>
                  <div className='A-chose-option'>
                    <div className="boxRadio">
                      <input className='A-radio-chose' type="radio" {...register('choise', {required: true})} value='3'/>
                    </div>
                    <span className='A-chose-opt-txt'>Opcion 3</span>
                  </div>
                  {
                    errors.choise && <span className='Q-err'>Elige una cotizacion</span>
                  }
              </div>
            </section>
            {/*  */}
            <div className='A-btnCont'>
              <div className="A-btnOptions">
                <button type='reset' className='A-btnClear'>Limpiar Campos</button>
                <button type='submit' className='A-btnSend'>Enviar</button>
              </div>
            </div>
          </form>
        </>
      )
    }
    return(
      <>
      <section className='form-Update formTwo' >
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input 
          type="text" 
          value={data.data.title} 
          disabled 
          />
        </div>
        <br />
        <section className="A-content">
          <div className="A-Description-cont">

            <label style={{
              width: 'auto',
              textalign: 'start',
            }} htmlFor="">Descripcion:</label>
            <textarea style={{
              height: 'auto',
            }}
            className='textarea-Res '
            value={data.data.description} 
            disabled
            />
            </div>
            <div className="A-RectorComments-cont">

            <label style={{
              width: 'auto',
              textalign: 'start',
            }} htmlFor="">Comentarios:</label>
            <textarea style={{
              height: 'auto',
            }}
            value={data.data.rectorComment}
            className='textarea-Res'
            disabled
            />
          </div>
        </section>
        {/*  */}
        {
          data.data.state === 6 ? <Quote req={data}/> : <strong>
            No hay cotizaciones
          </strong>    
        }
      </section>
      
      </>
    )
  }
  export const ViewRejectedResForm = (data) => {

    return(
      <>
      <form className='form-Update formTwo'>
        <div className='head'>
          <label htmlFor="">Titulo:</label>
          <input 
          type="text" 
          value={data.data.title} 
          disabled 
          />
        </div>

        <br />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }} className="body">

          <label style={{
            width: 'auto',
            textalign: 'start',
          }} htmlFor="">Descripcion:</label>
          <textarea style={{
            height: 'auto',
          }}
          className='textarea-Res '
          value={data.data.description} 
          disabled
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }} className="body">

          <label style={{
            width: 'auto',
            textalign: 'start',
          }} htmlFor="">Comentarios:</label>
          <textarea style={{
            height: 'auto',
          }}
          className='textarea-Res '
          disabled
          value={data.data.rectorComment} 
          />
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
