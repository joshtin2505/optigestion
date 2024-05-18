import { useForm } from "react-hook-form"
import { useReq } from "../context/ReqContext.jsx"
import { Document, Page } from "react-pdf"
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
  ModalCloseButton,
  Select,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { BsCloudUpload, BsDownload } from "react-icons/bs"
import useAuth from "../hooks/useAuth.js"
import "../assets/css/Approved.css"
import "../assets/css/ToQuote.css"
import "../assets/css/ViewPdf.css"

export const CreateUserForm = ({ roles, departaments }) => {
  const [modalName, setModalName] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { singUp, setNewRender } = useAuth()

  const onSubmit = handleSubmit(async (values) => {
    const res = await singUp(values)
    if (res.data.message) setModalName(res.data.message)
    setNewRender(true)
    res.status == 200 ? onOpen() : null
  })
  return (
    <form action="" className="reg-form" onSubmit={onSubmit}>
      <div className="dual">
        <div className="">
          <input
            className="RU-input"
            type="text"
            {...register("nombre", { required: true })}
            placeholder="Nombre"
          />
          {errors.nombre && (
            <p style={{ color: "#dc2626", fontWeight: "600" }}>
              nombre requerido
            </p>
          )}
        </div>
        <div className="">
          <input
            className="RU-input"
            type="text"
            {...register("apellido", { required: true })}
            placeholder="Apellido"
          />
          {errors.apellido && (
            <p style={{ color: "#dc2626", fontWeight: "600" }}>
              apellido requerido
            </p>
          )}
        </div>
      </div>
      <hr />
      <div className="third">
        <input
          className="RU-input"
          type="text"
          {...register("trabajo", { required: true })}
          placeholder="Puesto/Trabajo"
        />

        <Select
          className="select RU-input"
          bg="#6b6b6b69"
          color="white"
          border="none"
          borderRadius="2px"
          placeholder="-- Estatus --"
          {...register("activo", { required: true })}
          icon="none"
        >
          <option value={true}>Activo</option>
          <option value={false}>Inactivo</option>
        </Select>

        <Select
          className="select"
          bg="#6b6b6b69"
          color="white"
          border="none"
          borderRadius="2px"
          placeholder=" Rol "
          icon="none"
          {...register("rolUsuario", { required: true })}
        >
          {roles &&
            roles.map(({ id_rol, rol }, index) => {
              return (
                <option key={index} value={id_rol}>
                  {rol}
                </option>
              )
            })}
        </Select>
        {errors.trabajo && (
          <p style={{ color: "#dc2626", fontWeight: "600" }}>
            Puesto requerido
          </p>
        )}
        {errors.activo && (
          <p style={{ color: "#dc2626", fontWeight: "600" }}>
            Estatus de Actividad requerido
          </p>
        )}
        {errors.rolUsuario && (
          <p style={{ color: "#dc2626", fontWeight: "600" }}>rol requerido</p>
        )}
      </div>
      <hr />
      <div className="dual">
        <div className="">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && (
            <p style={{ color: "#dc2626", fontWeight: "600" }}>
              Email requerido
            </p>
          )}
        </div>
        <div className="">
          <Select
            className=""
            bg="#6b6b6b69"
            color="white"
            border="none"
            borderRadius="2px"
            placeholder=" Departamento "
            {...register("departamento", { required: true })}
            icon="none"
          >
            {departaments &&
              departaments.map(({ id, titulo }, index) => {
                return (
                  <option key={index} value={id}>
                    {titulo}
                  </option>
                )
              })}
          </Select>
          {errors.departamento && (
            <p style={{ color: "#dc2626", fontWeight: "600" }}>
              departamento requerido
            </p>
          )}
        </div>
      </div>

      <hr />
      <div className="dual">
        <div className="">
          <input
            className="RU-input"
            type="text"
            {...register("username", { required: true })}
            placeholder="Usuario"
          />
          {errors.username && (
            <p style={{ color: "#dc2626", fontWeight: "600" }}>
              Usuario requerido
            </p>
          )}
        </div>
        <div className="">
          <input
            className="RU-input"
            type="password"
            {...register("password", { required: true })}
            placeholder="Contraseña"
          />
          {errors.password && (
            <p style={{ color: "#dc2626", fontWeight: "600" }}>
              Contraseña requerido
            </p>
          )}
        </div>
      </div>
      <div className="btn-container">
        <button type="submit">Register</button>
      </div>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalName}</ModalHeader>
          <ModalBody>
            <button
              style={{
                background: "cyan",
                padding: "0 10px",
                borderRadius: "4px",
              }}
              onClick={() => {
                onClose()
              }}
              className="okbtn"
            >
              Ok
            </button>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  )
}
export const UpdateUserForm = ({ user, roles, departaments }) => {
  const [modalName, setModalName] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { updateUser, setNewRender } = useAuth()

  const onSubmit = handleSubmit(async (values) => {
    const departamento = !values.departamento.id
      ? user.departamento.id
      : values.departamento.id
    const nombre = !values.nombre ? user.nombre : values.nombre
    const apellido = !values.apellido ? user.apellido : values.apellido
    const trabajo = !values.trabajo ? user.trabajo : values.trabajo
    const rolUsuario = !values.rolUsuario.id_rol
      ? Number(user.rolUsuario.id_rol)
      : Number(values.rolUsuario.id_rol)
    const username = !values.username ? user.username : values.username
    const activo = !values.activo ? user.activo : values.activo
    const email = !values.email ? user.email : values.email

    if (values.password) {
      const res = await updateUser(user.id_Usuario, {
        departamento,
        nombre,
        apellido,
        trabajo,
        rolUsuario,
        username,
        activo,
        email,
        password: values.password,
      })
      if (res.data.message) setModalName(res.data.message)
      setNewRender(true)
      res.status == 200 ? onOpen() : null
    } else {
      const res = await updateUser(user.id_Usuario, {
        departamento,
        nombre,
        apellido,
        trabajo,
        rolUsuario,
        username,
        activo,
        email,
      })
      if (res?.data?.message) setModalName(res.data.message)
      setNewRender(true)
      res.status == 200 ? onOpen() : null
    }
  })
  return (
    <form action="" className="upd-form" onSubmit={onSubmit} noValidate>
      <div className="dual">
        <input
          className="RU-input"
          type="text"
          {...register("nombre")}
          placeholder="Nombre"
        />

        <input
          className="RU-input"
          type="text"
          {...register("apellido")}
          placeholder="Apellido"
        />
      </div>
      <hr />
      <div className="third">
        <input
          className="RU-input"
          type="text"
          {...register("trabajo")}
          placeholder="Puesto/Trabajo"
        />

        <Select
          className="select RU-input"
          bg="#6b6b6b69"
          color="white"
          border="none"
          borderRadius="2px"
          placeholder="-- Estatus --"
          {...register("activo")}
          icon="none"
        >
          <option value={true}>Activo</option>
          <option value={false}>Inactivo</option>
        </Select>
        <Select
          className="select"
          bg="#6b6b6b69"
          color="white"
          border="none"
          borderRadius="2px"
          placeholder=" Rol "
          icon="none"
          {...register("rolUsuario")}
        >
          {roles &&
            roles.map(({ id_rol, rol }, index) => {
              return (
                <option key={index} value={id_rol}>
                  {rol}
                </option>
              )
            })}
        </Select>
      </div>
      <hr />
      <div className="dual">
        <div className="">
          <input type="email" {...register("email")} placeholder="Email" />
          {errors.email && (
            <p style={{ color: "#dc2626", fontWeight: "600" }}>
              Email requerido
            </p>
          )}
        </div>
        <div className="">
          <Select
            className=""
            bg="#6b6b6b69"
            color="white"
            border="none"
            borderRadius="2px"
            placeholder=" Departamento "
            {...register("departamento")}
            icon="none"
          >
            {departaments &&
              departaments.map(({ id, titulo }, index) => {
                return (
                  <option key={index} value={id}>
                    {titulo}
                  </option>
                )
              })}
          </Select>
          {errors.departamento && (
            <p style={{ color: "#dc2626", fontWeight: "600" }}>
              departamento requerido
            </p>
          )}
        </div>
      </div>

      <hr />
      <div className="dual">
        <div className="">
          <input
            className="RU-input"
            type="text"
            {...register("username")}
            placeholder="Usuario"
          />
          {errors.username && (
            <p style={{ color: "#dc2626", fontWeight: "600" }}>
              Usuario requerido
            </p>
          )}
        </div>
        <div className="">
          <input
            className="RU-input"
            type="password"
            {...register("password")}
            placeholder="Contraseña"
          />
          {errors.password && (
            <p style={{ color: "#dc2626", fontWeight: "600" }}>
              Contraseña requerido
            </p>
          )}
        </div>
      </div>
      <div className="btn-container">
        <button type="submit">Actualizar</button>
      </div>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalName}</ModalHeader>
          <ModalBody>
            <button
              style={{
                background: "cyan",
                padding: "0 10px",
                borderRadius: "4px",
              }}
              onClick={() => {
                onClose()
              }}
              className="okbtn"
            >
              Ok
            </button>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  )
}
export const CreateReqForm = () => {
  const { createReq, sendInNewReq } = useReq()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sendSuccess, setSendSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
    watch,
  } = useForm()

  const onSubmit = handleSubmit((values) => {
    createReq(values)
    reset()
    onOpen()
  })
  const onSend = () => {
    const titulo = watch("titulo")
    const descripcion = watch("descripcion")
    if (titulo === "" || descripcion === "") {
      setError("titulo", "")
      setError("descripcion", "")
      return
    }
    sendInNewReq({
      titulo,
      descripcion,
    })
    reset()
    setSendSuccess(true)
  }

  if (sendSuccess === true) {
    setTimeout(() => {
      setSendSuccess(false)
    }, 5000)
  }
  return (
    <>
      <div className="CR-container">
        <h2>Solicitud</h2>
        <form className="form-Create formTwo" action="" onSubmit={onSubmit}>
          <div className="head">
            <label htmlFor="">Titulo:</label>
            <input
              type="text"
              {...register("titulo", {
                required: true,
                min: 5,
              })}
              onChange={(e) => setValue("titulo", e.target.value)}
              autoFocus
            />
          </div>
          {errors.titulo && (
            <div
              style={{
                color: "red",
              }}
              className="error"
            >
              Se necesita un titulo{" "}
            </div>
          )}
          <br />
          <label htmlFor="">Descripcion:</label>
          <br />
          <textarea
            {...register("descripcion", {
              required: true,
            })}
            onChange={(e) => setValue("descripcion", e.target.value)}
          ></textarea>
          {errors.descripcion && (
            <div
              style={{
                color: "red",
              }}
              className="error"
            >
              Se necesita una descripción
            </div>
          )}
          <div>
            <div className="btnOptions">
              <button type="reset" className="btnClear">
                Limpiar Campos
              </button>
              <button type="submit" className="btnSave">
                Guardar
              </button>
              <button type="button" onClick={onSend} className="btnSend">
                Enviar
              </button>
            </div>
          </div>
        </form>
        {sendSuccess && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Solicitud Enviada!</AlertTitle>
            <AlertDescription>
              Tu Solicitud ha sido enviada con exito.
            </AlertDescription>
          </Alert>
        )}
        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Solcitud Guardada</ModalHeader>
            <ModalBody>
              <Link
                style={{
                  background: "#6b6b6b",
                  padding: "8px 5px",
                  color: "#fff",
                  borderRadius: "4px",
                }}
                to="/"
              >
                Volver a Inicio
              </Link>
              <Link
                style={{
                  background: "#6b6b6b",
                  padding: "8px 5px",
                  color: "#fff",
                  borderRadius: "4px",
                  margin: "10px",
                }}
                to="/req-draft"
              >
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
export const UpdateReqForm = ({ data }) => {
  const { updateReq, sendSavedReq } = useReq()
  const [inValues, setInValues] = useState({
    titulo: data.titulo,
    descripcion: data.descripcion,
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm()

  const onSubmit = handleSubmit((values) => {
    updateReq({ id: data.id_requerimeinto, ...values })
  })
  const onSend = () => {
    sendSavedReq(data.id_requerimeinto)
  }
  const handleChange = () => {
    const titulo = watch("titulo")
    const descripcion = watch("descripcion")
    setInValues({
      titulo,
      descripcion,
    })
  }
  return (
    <>
      <form
        className="form-Update formTwo"
        onChange={handleChange}
        onSubmit={onSubmit}
      >
        <div className="head">
          <label htmlFor="">Titulo:</label>
          <input
            type="text"
            onChange={(e) => setValue("titulo", e.target.value)}
            value={inValues.titulo}
            {...register("titulo", {
              required: true,
              min: 5,
            })}
            autoFocus
          />
        </div>
        {errors.titulo && <div className="error">Se necita un titulo </div>}
        <br />
        <label htmlFor="">Descripcion:</label>
        <br />
        <textarea
          onChange={(e) => {
            setValue("descripcion", e.target.value)
          }}
          value={inValues.descripcion}
          {...register("descripcion", {
            required: true,
          })}
        ></textarea>
        {errors.descripcion && (
          <div className="error">Se necita una descripción</div>
        )}
        <div>
          <div className="btnOptions">
            <button type="submit" className="btnSave">
              Guardar
            </button>
            <button type="button" onClick={onSend} className="btnSend">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
export const ResReqForm = ({ data }) => {
  const { sendRectorRes } = useReq()
  const [inValues, setInValues] = useState()
  const { setValue, watch } = useForm()

  const onApprove = () => {
    sendRectorRes({
      id: data.id_requerimeinto,
      comentaio_rector: inValues,
      estado: 4,
    })
  }
  const onReject = () => {
    sendRectorRes({
      id: data.id_requerimeinto,
      comentaio_rector: inValues,
      estado: 5,
    })
  }
  const handleChange = () => {
    const comentaio_rector = watch("comentaio_rector")
    setInValues(comentaio_rector)
  }
  return (
    <>
      <form className="form-Update formTwo" onChange={handleChange}>
        <div className="head">
          <label htmlFor="">Titulo:</label>
          <input type="text" value={data.titulo} disabled />
        </div>

        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="body"
        >
          <label
            style={{
              width: "auto",
              textalign: "start",
            }}
            htmlFor=""
          >
            Descripcion:
          </label>
          <textarea
            style={{
              height: "auto",
            }}
            className="textarea-Res "
            value={data.descripcion}
            disabled
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="body"
        >
          <label
            style={{
              width: "auto",
              textalign: "start",
            }}
            htmlFor=""
          >
            Comentarios:
          </label>
          <textarea
            style={{
              height: "auto",
            }}
            className="textarea-Res "
            onChange={(e) => {
              setValue("comentaio_rector", e.target.value)
            }}
            autoFocus
          />
        </div>

        <div>
          <div className="btnOptions">
            <button type="button" onClick={onReject} className="btnSend">
              Rechazar
            </button>
            <button type="button" onClick={onApprove} className="btnSave">
              Aprobar
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
export const ToQuoteResForm = ({ data, setUpdateComponent }) => {
  const [pdfs, setPdfs] = useState([null, null, null])
  const [fileNames, setFileNames] = useState([
    "No hay archivos cargados",
    "No hay archivos cargados",
    "No hay archivos cargados",
  ])
  const { LogisticRes } = useReq()

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
    if (pdf1 && pdf2 && pdf3) {
      const formData = new FormData()

      formData.append("id", data.id_requerimeinto)
      formData.append("pdf1", pdf1)
      formData.append("pdf2", pdf2)
      formData.append("pdf3", pdf3)

      LogisticRes(formData)

      setUpdateComponent((prevValue) => prevValue + 1)
    }
  }

  return (
    <>
      <form
        encType="multipart/form-data"
        className="form-Update formTwo"
        onSubmit={handleSubmit}
      >
        <div className="head">
          <label htmlFor="">Titulo:</label>
          <input type="text" value={data.titulo} disabled />
        </div>

        <br />
        <section className="TQ-content">
          <div className="TQ-Description-cont">
            <label
              style={{
                width: "auto",
                textalign: "start",
              }}
              htmlFor=""
            >
              Descripcion:
            </label>
            <textarea
              style={{
                height: "auto",
              }}
              className="textarea-Res "
              value={data.descripcion}
              disabled
            />
          </div>
          <div className="TQ-comentaio_rectors-cont">
            <label
              style={{
                width: "auto",
                textalign: "start",
              }}
              htmlFor=""
            >
              Comentarios:
            </label>
            <textarea
              style={{
                height: "auto",
              }}
              value={data.comentaio_rector}
              className="textarea-Res"
              disabled
            />
          </div>
        </section>
        {/*  */}
        <div>
          <h1>Cotizacones</h1>
          <hr />
          <section className="TQ-middle-section">
            {[0, 1, 2].map((index) => (
              <div className="TQ-toQuote-Box" key={index}>
                <div
                  className="TQ-btn-pdf-cont"
                  onClick={() =>
                    document.querySelector(`.option${index + 1}In`).click()
                  }
                >
                  <h5 className="TQ-title-op">{`Opcion ${index + 1}`}</h5>
                  <input
                    type="file"
                    accept=".pdf"
                    className={`option${index + 1}In`}
                    hidden
                    multiple={false}
                    onChange={({ target: { files } }) =>
                      handleFileChange(index, files)
                    }
                    name={`pdf${index + 1}`}
                    required
                  />
                  <BsCloudUpload fill="#ececec" size={50} />
                  <p className="TQ-pdf-name">{fileNames[index]}</p>
                </div>
              </div>
            ))}
          </section>
          {/*  */}
        </div>
        {/*  */}
        <div className="TQ-btnCont">
          <div className="TQ-btnOptions">
            <button type="submit" className="TQ-btnSend">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
export const ViewToBuyResForm = ({ data }) => {

  function Quote({ req }) {
    const { cotizacion } = req
    const [[pdf1, pdf1Name], [pdf2, pdf2Name], [pdf3, pdf3Name]] = cotizacion

    const request = req
    const {
      isOpen: isOpen1,
      onOpen: onOpen1,
      onClose: onClose1,
    } = useDisclosure()
    const {
      isOpen: isOpen2,
      onOpen: onOpen2,
      onClose: onClose2,
    } = useDisclosure()
    const {
      isOpen: isOpen3,
      onOpen: onOpen3,
      onClose: onClose3,
    } = useDisclosure()
    function PdfView({ url, title, isOpen, onClose, onOpen }) {
      return (
        <>
          <Modal
            size={"full"}
            isCentered
            motionPreset="slideInBottom"
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <iframe className="pdf" src={url} />
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
          <section className="A-middle-section">
            {/* --- */}
            {[1, 2, 3].map((index) => {
              const value = index === 1 ? pdf1 : index === 2 ? pdf2 : pdf3
              const nameValue =
                index === 1 ? pdf1Name : index === 2 ? pdf2Name : pdf3Name

              const byteCharacters = atob(value)
              const byteNumbers = new Array(byteCharacters.length)

              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i)
              }
              
              const pdfBytes = new Uint8Array(byteNumbers)
              const blob = new Blob([pdfBytes], { type: "application/pdf" })
              const url = window.URL.createObjectURL(blob)
              const PdfViewerProps = {
                url,
                title: nameValue,
                isOpen: index === 1 ? isOpen1 : index === 2 ? isOpen2 : isOpen3,
                onOpen: index === 1 ? onOpen1 : index === 2 ? onOpen2 : onOpen3,
                onClose:
                  index === 1 ? onClose1 : index === 2 ? onClose2 : onClose3,
              }
              return (
                <div className="A-toQuote-Box" key={index}>
                  <h5 className="A-title-op">Opcion {index}</h5>
                  <p className="A-pdf-name">{nameValue}</p>
                  <PdfView {...PdfViewerProps} />
                  <div className="A-btn-pdf-cont">
                    <button
                      onClick={
                        index === 1 ? onOpen1 : index === 2 ? onOpen2 : onOpen3
                      }
                      className="A-btn-view"
                      type="button"
                    >
                      Ver
                    </button>
                    <a
                      href={url}
                      rel="noreferrer"
                      download={`cotizacion_${nameValue}`}
                      target="_blank"
                      className="A-btn-download"
                    >
                      <BsDownload size={20} fill="#fff" />
                    </a>
                  </div>
                </div>
              )
            })}
            {/* --- */}
          </section>
          {/*  */}
          <section className="A-down-section">
            <h5 className="A-operative-comments-txt">Comentarios: </h5>
            <textarea
              className="A-operative-comments-in"
              value={request.comentario_compra}
              disabled
            />
            <div className="A-chose-cont">
              <h6 className="A-chose-title">Comprar</h6>
              <h6 className="A-chose-title">Opcion {request.opcion_elegida}</h6>
            </div>
          </section>
          {/*  */}
        </form>
      </>
    )
  }
  return (
    <>
      <section className="form-Update formTwo">
        <div className="head">
          <label htmlFor="">Titulo:</label>
          <input type="text" value={data.titulo} disabled />
        </div>
        <br />
        <section className="A-content">
          <div className="A-Description-cont">
            <label
              style={{
                width: "auto",
                textalign: "start",
              }}
              htmlFor=""
            >
              Descripcion:
            </label>
            <textarea
              style={{
                height: "auto",
              }}
              className="textarea-Res "
              value={data.descripcion}
              disabled
            />
          </div>
          <div className="A-RectorComments-cont">
            <label
              style={{
                width: "auto",
                textalign: "start",
              }}
              htmlFor=""
            >
              Comentarios:
            </label>
            <textarea
              style={{
                height: "auto",
              }}
              value={data.comentario_rector}
              className="textarea-Res"
              disabled
            />
          </div>
        </section>
        {/*  */}
        {data.estado.id === 7 && <Quote req={data} />}
      </section>
    </>
  )
}
export const ViewApprovedResForm = ({ data }) => {
  const { setChosenQuote, getQuotedReq } = useReq()
  const [requeriment, setRequeriment] = useState(data)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuotedReq() {
      getQuotedReq()
        .then((reqs) => {
          if (reqs) setLoading(false)
          reqs.map((req) => {
            if (req.id_requerimeinto === data.id_requerimeinto) {
              setRequeriment(req)
            }
          })
        })
        .catch(() => setLoading(false))
    }
    fetchQuotedReq()
  }, [])

  function Quote({ req }) {
    const request = req
    const { cotizacion } = request
    const [[pdf1, pdf1Name], [pdf2, pdf2Name], [pdf3, pdf3Name]] = cotizacion

    const {
      isOpen: isOpen1,
      onOpen: onOpen1,
      onClose: onClose1,
    } = useDisclosure()
    const {
      isOpen: isOpen2,
      onOpen: onOpen2,
      onClose: onClose2,
    } = useDisclosure()
    const {
      isOpen: isOpen3,
      onOpen: onOpen3,
      onClose: onClose3,
    } = useDisclosure()

    function PdfView({ url, title, isOpen, onClose, onOpen }) {
      return (
        <>
          <Modal
            size={"full"}
            isCentered
            motionPreset="slideInBottom"
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <iframe className="pdf" src={url} frameBorder="0"></iframe>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
    }
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
    const onSubmit = handleSubmit((values) => {
      setChosenQuote( request.id_requerimeinto, { ...values })
    })
    return (
      <>
        <form onSubmit={onSubmit}>
          <h1>Cotizacones</h1>
          <hr />
          <section className="A-middle-section">
            {[1, 2, 3].map((index) => {
              const value = index === 1 ? pdf1 : index === 2 ? pdf2 : pdf3
              const nameValue =
                index === 1 ? pdf1Name : index === 2 ? pdf2Name : pdf3Name

              const byteCharacters = atob(value)
              const byteNumbers = new Array(byteCharacters.length)

              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i)
              }
              
              const pdfBytes = new Uint8Array(byteNumbers)
              const blob = new Blob([pdfBytes], { type: "application/pdf" })
              const url = window.URL.createObjectURL(blob)
              const PdfViewerProps = {
                url,
                title: nameValue,
                isOpen: index === 1 ? isOpen1 : index === 2 ? isOpen2 : isOpen3,
                onOpen: index === 1 ? onOpen1 : index === 2 ? onOpen2 : onOpen3,
                onClose:
                  index === 1 ? onClose1 : index === 2 ? onClose2 : onClose3,
              }
              return (
                <div className="A-toQuote-Box" key={index}>
                  <h5 className="A-title-op">Opcion {index}</h5>
                  <p className="A-pdf-name">{nameValue}</p>
                  <PdfView {...PdfViewerProps} />
                  <div className="A-btn-pdf-cont">
                    <button
                      onClick={
                        index === 1 ? onOpen1 : index === 2 ? onOpen2 : onOpen3
                      }
                      className="A-btn-view"
                      type="button"
                    >
                      Ver
                    </button>
                    <a
                      href={url}
                      rel="noreferrer"
                      download={`cotizacion_${nameValue}`}
                      target="_blank"
                      className="A-btn-download"
                    >
                      <BsDownload size={20} fill="#fff" />
                    </a>
                  </div>
                </div>
              )
            })}
          </section>
          {/*  */}
          <section className="A-down-section">
            <h5 className="A-operative-comments-txt">Comentarios: </h5>
            <textarea
              className="A-operative-comments-in"
              {...register("comentario_compra")}
            />
            <div className="A-chose-cont">
              <h6 className="A-chose-title">Elige</h6>
              <div className="A-chose-option">
                <div className="boxRadio">
                  <input
                    className="A-radio-chose"
                    type="radio"
                    {...register("opcion_elegida", { required: true })}
                    value="1"
                  />
                </div>
                <span className="A-chose-opt-txt">Opcion 1</span>
              </div>
              <div className="A-chose-option">
                <div className="boxRadio">
                  <input
                    className="A-radio-chose"
                    type="radio"
                    {...register("opcion_elegida", { required: true })}
                    value="2"
                  />
                </div>
                <span className="A-chose-opt-txt">Opcion 2 </span>
              </div>
              <div className="A-chose-option">
                <div className="boxRadio">
                  <input
                    className="A-radio-chose"
                    type="radio"
                    {...register("opcion_elegida", { required: true })}
                    value="3"
                  />
                </div>
                <span className="A-chose-opt-txt">Opcion 3</span>
              </div>
              {errors.opcion_elegida && (
                <span className="Q-err">Elige una cotizacion</span>
              )}
            </div>
          </section>
          {/*  */}
          <div className="A-btnCont">
            <div className="A-btnOptions">
              <button type="reset" className="A-btnClear">
                Limpiar Campos
              </button>
              <button type="submit" className="A-btnSend">
                Enviar
              </button>
            </div>
          </div>
        </form>
      </>
    )
  }
  return (
    <>
      <section className="form-Update formTwo">
        <div className="head">
          <label htmlFor="">Titulo:</label>
          <input type="text" value={requeriment.titulo} disabled />
        </div>
        <br />
        <section className="A-content">
          <div className="A-Description-cont">
            <label
              style={{
                width: "auto",
                textalign: "start",
              }}
              htmlFor=""
            >
              Descripcion:
            </label>
            <textarea
              style={{
                height: "auto",
              }}
              className="textarea-Res "
              value={requeriment.descripcion}
              disabled
            />
          </div>
          <div className="A-RectorComments-cont">
            <label
              style={{
                width: "auto",
                textalign: "start",
              }}
              htmlFor=""
            >
              Comentarios:
            </label>
            <textarea
              style={{
                height: "auto",
              }}
              value={requeriment.comentario_rector}
              className="textarea-Res"
              disabled
            />
          </div>
        </section>
        {/*  */}
        {requeriment.estado.id === 6 ? (
          <div>
            {loading ? (
              <strong>Loading...</strong>
            ) : (
              <Quote req={requeriment} />
            )}
          </div>
        ) : (
          <strong>No hay cotizaciones</strong>
        )}
      </section>
    </>
  )
}
export const ViewRejectedResForm = ({data}) => {
  return (
    <>
      <form className="form-Update formTwo">
        <div className="head">
          <label htmlFor="">Titulo:</label>
          <input type="text" value={data.titulo} disabled />
        </div>

        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="body"
        >
          <label
            style={{
              width: "auto",
              textalign: "start",
            }}
            htmlFor=""
          >
            Descripcion:
          </label>
          <textarea
            style={{
              height: "auto",
            }}
            className="textarea-Res "
            value={data.descripcion}
            disabled
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="body"
        >
          <label
            style={{
              width: "auto",
              textalign: "start",
            }}
            htmlFor=""
          >
            Comentarios:
          </label>
          <textarea
            style={{
              height: "auto",
            }}
            className="textarea-Res "
            disabled
            value={data.comentario_rector}
          />
        </div>
      </form>
    </>
  )
}
export const ViewReqForm = ({ data }) => {
  return (
    <>
      <form className="form-view formTwo">
        <div className="head">
          <label htmlFor="">Titulo:</label>
          <input disabled value={data.titulo} />
          <label htmlFor="">Estado:</label>
        </div>
        <br />
        <label htmlFor="">Descripcion:</label>
        <br />
        <textarea disabled value={data.descripcion}></textarea>
      </form>
    </>
  )
}
