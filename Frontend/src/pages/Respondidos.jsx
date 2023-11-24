import { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx'
import { useReq } from '../context/ReqContext.jsx'
import '../assets/css/Draft.css'
import {BsSearch,BsEye} from 'react-icons/bs'
import {useForm} from 'react-hook-form'
import {ViewApprovedResForm, ViewRejectedResForm} from '../components/Forms.jsx'
 

function Respondidos() {
  const {getApprovedReq,getRejectedReq, response: res} = useReq()
  const [approvedResponse ,setApprovedResponse] = useState([])
  const [rejectedResponse ,setRejectedResponse] = useState([])

  useEffect(() => {
    const fetchReq = async () => {
      const resA = await getApprovedReq()
        if (Array.isArray(resA)) setApprovedResponse(resA)
      const resR = await getRejectedReq()
        if (Array.isArray(resR)) setRejectedResponse(resR)
    }
    fetchReq()
  },[res])
  
  return (
    <>
      <Nav type={1}/>
      <div className="">
        <ViewResRequest type res={approvedResponse} title={'Aprovados'}/>
        <ViewResRequest type={false} res={rejectedResponse} title={'Rechazados'}/>
      </div>
    </>
  )
}

function ViewResRequest({res, title, type}) {
  const {register, setValue, watch} = useForm()

  const List = ({req, concatDate}) => {
    const [openReq, setOpenReq] = useState(false)

    return (
      <section className='Br-card-real' >
        <div  className='BrCard' >
          <div className="Br-card-txt">
            <p>{concatDate}</p>
            <p>|</p>
            <p>{req.title}</p>
            <span>-</span>
            <p>{req.description}</p>
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
              type ? <ViewApprovedResForm data={req}/> : <ViewRejectedResForm data={req}/>
              )
            }
            </div>
      </section>
    )
  }

  function handleSubmit(e){
    e.preventDefault()
  }
  const search = watch('search')
  const filteredResponse = res.filter((req) => {
    return (
      req.title.toLowerCase().includes(search.toLowerCase()) ||
      req.description.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <>
      <div className="Br-real-cont">
        <form onSubmit={handleSubmit} action="" className='search-form'>
          <BsSearch className='search-icon' fill='#6b6b6b' size={25}/>
          <input type="text" {...register('search')} autoFocus   onChange={(e) => setValue('search', e.target.value)} className='search-in'/>
        </form>
        <section className='Br-box-cont'>
          <div className="head">
              <h1 className='Br-title'>{title}</h1>
          </div>
          <hr />
          <div className='Br-cards-cont'>
            {
              filteredResponse && 
              filteredResponse.map(req => {
                const fecha = new Date(req.date)
                const concatDate = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear() 
                return <List key={req._id} req={req} concatDate={concatDate}/>
              })
            }
            {/* Si no hay Solicitudes */}
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
    </>

  )
}

export default Respondidos