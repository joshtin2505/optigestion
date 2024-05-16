import { useEffect, useState } from 'react'
import Nav from '../../components/Nav.jsx'
import { useReq } from '../../context/ReqContext.jsx'
import '../../assets/css/Draft.css'
import {BsSearch,BsEye} from 'react-icons/bs'
import {useForm} from 'react-hook-form'
import {ViewReqForm} from '../../components/Forms.jsx'
import '../../assets/css/Extra.css'

function Enviados() {
  const {getAllsentReq } = useReq()
  const {register, setValue, watch} = useForm()
  const [response ,setResponse] = useState([])



  useEffect(() => {
    const fetchReq = async () => {
      const res = await getAllsentReq()
      setResponse(res.data)
    }
    fetchReq()
  },[])

  function handleSubmit(e){
    e.preventDefault()
  }
  const search = watch('search')
  const filteredResponse = response?.filter((req) => {
    return (
      req?.titulo.toLowerCase().includes(search.toLowerCase()) ||
      req?.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      req?.tipoRequerimiento.titulo.toLowerCase().includes(search.toLowerCase()) ||
      req?.tipoRequerimiento.descripcion.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
  <div className='back'>
      <Nav type={1}/>
      <div className="Br-real-cont">
        <form onSubmit={handleSubmit} action="" className='search-form'>
          <BsSearch className='search-icon' fill='#6b6b6b' size={25}/>
          <input type="text" {...register('search')} autoFocus   onChange={(e) => setValue('search', e.target.value)} className='search-in'/>
        </form>
        <section className='Br-box-cont'>
          <div className="head">
              <h1 className='Br-title'>Enviados</h1>
          </div>
          <hr />
          <div className='Br-cards-cont'>
            {
              filteredResponse && 
              filteredResponse.map(req => {
                const fecha = new Date(req.fecha_creacion)
                const concatDate = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear() 
                return <List key={req.id_requerimeinto} req={req} concatDate={concatDate}/>
              })
            }
            {
              filteredResponse.length === 0  &&
              <div className='BrCard'>
                <div className="Br-card-txt" style={{
                  "display": "flex",
                  "justifyContent": "center",
                  "fontWeight": "bold",
                }}>
                  <p>No hay Solicitudes</p>
                </div>
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  )
}

const List = ({req, concatDate}) => {
  const [openReq, setOpenReq] = useState(false)

  return (
    <section className='Br-card-real' >
      <div  className='BrCard' >
        <div className="Br-card-txt">
          <p>{concatDate}</p>
          <p>|</p>
          <p className='card-title'>{req.titulo}</p>
          <span>-</span>
          <p className='card-description'>{req.descripcion}</p>
        </div>
        <div className="Br-options">
          <BsEye onClick={() =>{
            setOpenReq(!openReq)
            }} className='Br-icon' fill='#6b6b6b' size={18}/>
          
          </div>
      </div>
      <div className='BR-ed-cont'>
        {
          openReq && (
            <ViewReqForm data={req}/>
            )
          }
          </div>
    </section>
  )
}

export default Enviados