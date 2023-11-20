import { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx'
import { useReq } from '../context/ReqContext.jsx'
import '../assets/css/Draft.css'
import {BsSearch, BsTrash, BsFolder,BsPen} from 'react-icons/bs'
import {useForm} from 'react-hook-form'
import {ReqForm} from './CrearSolicitud.jsx'
 
function Borrador() {
  const {getAllReq, updateReq, response: DBres } = useReq()
  const {register, setValue, watch} = useForm()

  const [response ,setResponse] = useState([])
  const [updateComponent, setUpdateComponent] = useState(0)

  const search = watch('search')

  useEffect(() => {
    const fetchReq = async () => {
      const res = await getAllReq()
      setResponse(res)
    }

    fetchReq()
  },[updateComponent])

  function handleSubmit(e){
    e.preventDefault()
  }

  const filteredResponse = response.filter((req) => {
    return (
      (req.title.toLowerCase().includes(search.toLowerCase()) ||
      req.description.toLowerCase().includes(search.toLowerCase())) && 
      req.state === 1
    )
  })
  const toTrash = (id) => {
    updateReq({state: 0, id})
    setUpdateComponent(prevValue => prevValue + 1)
  }
  const toFile = (id) => {
    updateReq({state: 2, id})
    setUpdateComponent(prevValue => prevValue + 1)
  }

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

              <h1 className='Br-title'>Borrador</h1>

          </div>
          <hr />
          <div className='Br-cards-cont'>
            {
              filteredResponse && 
              filteredResponse.map(req => {
                const fecha = new Date(req.date)
                const concatDate = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear() 
                return <List req={req} concatDate={concatDate}/>
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
    <section className='Br-card-real' key={req._id}>
      <div  className='BrCard' >

        <div className="Br-card-txt">
          <p>{concatDate}</p>
          <p>|</p>
          <p>{req.title}</p>
          <span>-</span>
          <p>{req.description}</p>
        </div>
        <div className="Br-options">
          <BsPen onClick={() =>{
            setOpenReq(!openReq)
            }} className='Br-icon' fill='#6b6b6b' size={18}/>
          <BsTrash onClick={() =>{
            toTrash(req._id)
          }} className='Br-icon' fill='#6b6b6b' size={18}/>
          <BsFolder onClick={() =>{
            toFile(req._id)
          }} className='Br-icon' fill='#6b6b6b' size={18}/>
          </div>
      </div>
      <div className='bR-ed-cont'>
        {
          openReq && (
            <ReqForm typeForm={false} data={req}/>
            )
          }
          </div>
    </section>
  )
}

export default Borrador