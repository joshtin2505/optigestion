import axios from "../api/axios.js"
import {
  addRequest,
  deleteRequeriment,
  getAllRequirements,
  getLogisticQuote,
  getRequerimentById,
  logisticRes,
  updateRequeriment,
} from "../api/requeriments.api.js"
import Request from "../models/request.models.js"
// Basics Methods of the requirements

// Obtener todos los requerimientos
export const getRequirements = async (req, res) => {
  getAllRequirements()
    .then((response) => {
      const reqUser = response.data.map((requeriment) => {
        if (requeriment.usuario.id_Usuario === req.user.id) {
          return requeriment
        }
      })
      if (reqUser.length === 0)
        return res.status(200).json({ message: "No hay requerimientos" })
      res.json(reqUser)
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo obtener los requerimientos" })
    })
}
// Obtener un solo requerimineto ✅
export const getRequest = async (req, res) => {
  getRequerimentById(req.params.id)
    .then((response) => {
      if (response.status === 404) {
        return res
          .status(404)
          .json({ message: "No se encontró el requerimiento" })
      }
      if (response.data.usuario.id_Usuario !== req.user.id) {
        return res.status(401).json({ message: "No tienes permisos" })
      }

      res.json(response.data)
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo obtener el requerimiento" })
    })
}
// Crear Requerimiento, lo que lo guarda como un borrador ✅
export const createRequest = async (req, res) => {
  const { titulo, descripcion, estado, tipoRequerimiento } = req.body
  addRequest({
    titulo,
    descripcion,
    estado: 1,
    usuario: req.user.id,
    tipoRequerimiento: 0, // Actualizar la ui para que no tenga que quemarce este dato
  })
    .then((response) => {
      res.json({
        message: "Requerimiento creado",
        data: response.data,
      })
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo crear el requerimiento" })
    })
}
// Actualizar un req ya creado - No se puede actualizar una ya en proceso(enviado, aprovado, cotizado) ✅
export const updateRequest = async (req, res) => {
  const id = req.params.id
  updateRequeriment({
    ...req.body,
    id,
  })
    .then((response) => {
      res.json({
        message: "Requerimiento actualizado",
        data: response.data,
      })
    })
    .catch((error) => {
      if (error.response.status === 404) {
        return res
          .status(404)
          .json({ message: "No se encontró el requerimiento" })
      }
      res
        .status(400)
        .json({ message: "No se pudo actualizar el requerimiento" })
    })
}
// Eleimiar un req | solo si no esta ya en proceso ✅
export const deleteRequest = async (req, res) => {
  deleteRequeriment(req.params.id)
    .then((response) => {
      res.json({ message: "Requerimiento eliminado", data: response.data })
    })
    .catch((error) => {
      if (error.response.status === 404) {
        return res.status(404).json({
          message: "No se encontró el requerimiento",
          data: error.response.data,
        })
      }
      res.status(400).json({
        message: "No se pudo eliminar el requerimiento",
        data: error.response.data,
      })
    })
}

// <------------------------------------------------------>
// Advanced Methods of the requirements

// Enviados ✅
// Enviar si ya esta guardado
export const sendSavedRequest = async (req, res) => {
  const id = req.params.id
  updateRequeriment({
    ...req.body,
    estado: 3,
    id,
  })
    .then((response) => {
      res.json({
        message: "Requerimiento Enviado",
        data: response.data,
      })
    })
    .catch((error) => {
      if (error.response.status === 404) {
        return res
          .status(404)
          .json({ message: "No se encontró el requerimiento" })
      }
      res
        .status(400)
        .json({ message: "No se pudo actualizar el requerimiento" })
    })
}
//  Enviar si no esta guardado
export const sendNewRequest = async (req, res) => {
  const { titulo, descripcion } = req.body
  addRequest({
    titulo,
    descripcion,
    estado: 3,
    usuario: req.user.id,
    tipoRequerimiento: 0,
  })
    .then((response) => {
      res.json({
        message: "Requerimiento creado",
        data: response.data,
      })
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo crear el requerimiento" })
    })
}
export const getSent = async (req, res) => {
  getAllRequirements()
    .then((response) => {
      const reqSendUser = response.data
        ? response.data.map((requeriment) => {
            if (
              requeriment.usuario.id_Usuario === req.user.id &&
              requeriment.estado.id === 3
            ) {
              return requeriment
            }
          })
        : []
      if (reqSendUser.length === 0)
        return res
          .status(200)
          .json({ message: "No hay requerimientos", data: reqSendUser })
      res.json({ data: reqSendUser })
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo obtener los requerimientos" })
    })
}

// Arcivado ✅
export const fileRequest = async (req, res) => {
  const { id } = req.params

  const requeriment = await getRequerimentById(id)
  if (requeriment.data.estado.id === 2) {
    updateRequeriment({
      estado: 1,
      id,
    })
      .then((response) => {
        res.json({
          message: "Requerimiento desarchivado",
          data: response.data,
        })
      })
      .catch((error) => {
        if (error.response.status === 404) {
          return res
            .status(404)
            .json({ message: "No se encontró el requerimiento" })
        }
        res
          .status(400)
          .json({ message: "No se pudo actualizar el requerimiento" })
      })
  } else if (requeriment.data.estado.id === 1) {
    updateRequeriment({
      estado: 2,
      id,
    })
      .then((response) => {
        res.json({
          message: "Requerimiento archivado",
          data: response.data,
        })
      })
      .catch((error) => {
        if (error.response.status === 404) {
          return res
            .status(404)
            .json({ message: "No se encontró el requerimiento" })
        }
        res
          .status(400)
          .json({ message: "No se pudo actualizar el requerimiento" })
      })
  } else {
    res.status(400).json({ message: "No se pudo Archivar el requerimiento" })
  }
}
export const getFiles = async (req, res) => {
  getAllRequirements()
    .then((response) => {
      const reqFileUser =
        response.data.length > 0
          ? response.data.map((requeriment) => {
              if (
                requeriment.usuario.id_Usuario === req.user.id &&
                requeriment.estado.id === 2
              ) {
                return requeriment
              }
            })
          : []
      if (reqFileUser.length === 0)
        return res
          .status(200)
          .json({ message: "No hay requerimientos", data: reqFileUser })
      res.json({ data: reqFileUser })
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo obtener los requerimientos" })
    })
}

// Papelera ✅
export const trashRequest = async (req, res) => {
  const { id } = req.params

  const requeriment = await getRequerimentById(id)
  if (requeriment.data.estado.id === 2) {
    updateRequeriment({
      estado: 0,
      id,
    })
      .then((response) => {
        res.json({
          message: "Requerimiento En papelera",
          data: response.data,
        })
      })
      .catch((error) => {
        if (error.response.status === 404) {
          return res.status(404).json({
            message: "No se encontró el requerimiento",
            data: error.response.data,
          })
        }
        res.status(400).json({
          message: "No se pudo actualizar el requerimiento",
          data: error.response.data,
        })
      })
  } else if (requeriment.data.estado.id === 1) {
    updateRequeriment({
      estado: 0,
      id,
    })
      .then((response) => {
        res.json({
          message: "Requerimiento en papelera",
          data: response.data,
        })
      })
      .catch((error) => {
        if (error.response.status === 404) {
          return res.status(404).json({
            message: "No se encontró el requerimiento",
            data: error.response.data,
          })
        }
        res.status(400).json({
          message: "No se pudo actualizar el requerimiento",
          data: error.response.data,
        })
      })
  } else if (requeriment.data.estado.id === 0) {
    updateRequeriment({
      estado: 1,
      id,
    })
      .then((response) => {
        res.json({
          message: "Requerimiento Restaurado",
          data: response.data,
        })
      })
      .catch((error) => {
        if (error.response.status === 404) {
          return res.status(404).json({
            message: "No se encontró el requerimiento",
            data: error.response.data,
          })
        }
        res
          .status(400)
          .json({ message: "No se pudo restaurar el requerimiento" })
      })
  } else {
    res
      .status(400)
      .json({ message: "No se pudo Archivar el requerimiento", data: null })
  }
}
export const getTrash = async (req, res) => {
  getAllRequirements()
    .then((response) => {
      const reqFileUser =
        response.data.length > 0
          ? response.data.map((requeriment) => {
              if (
                requeriment.usuario.id_Usuario === req.user.id &&
                requeriment.estado.id === 0
              ) {
                return requeriment
              }
            })
          : []
      if (reqFileUser.length === 0)
        return res
          .status(200)
          .json({ message: "No hay requerimientos", data: reqFileUser })
      res.json({ data: reqFileUser })
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo obtener los requerimientos" })
    })
}

// Borrador ✅
export const getDraft = async (req, res) => {
  getAllRequirements()
    .then((response) => {
      const reqDraftUser =
        response?.data?.length > 0
          ? response?.data?.map((requeriment) => {
              if (
                requeriment.usuario.id_Usuario === req.user.id &&
                requeriment.estado.id === 1
              ) {
                return requeriment
              }
            })
          : []
      if (reqDraftUser.length === 0)
        return res
          .status(200)
          .json({ message: "No hay requerimientos", data: reqDraftUser })
      res.json({ data: reqDraftUser })
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo obtener los requerimientos" })
    })
}

// Respondidos ✅
export const getAllAprovedRequirements = async (req, res) => {
  getAllRequirements()
    .then((response) => {
      const reqFileUser =
        response.data.length > 0
          ? response.data.map((requeriment) => {
              if (
                requeriment.usuario.id_Usuario === req.user.id &&
                (requeriment.estado.id === 5 || requeriment.estado.id === 6)
              ) {
                return requeriment
              }
            })
          : []
      if (reqFileUser.length === 0)
        return res
          .status(200)
          .json({ message: "No hay requerimientos", data: reqFileUser })
      console.log(reqFileUser)
      res.json({ data: reqFileUser })
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo obtener los requerimientos" })
    })
}

export const getAllRejectedRequirements = async (req, res) => {
  getAllRequirements()
    .then((response) => {
      const reqFileUser =
        response.data.length > 0
          ? response.data.map((requeriment) => {
              if (
                requeriment.usuario.id_Usuario === req.user.id &&
                requeriment.estado.id === 5
              ) {
                return requeriment
              }
            })
          : []
      if (reqFileUser.length === 0)
        return res
          .status(200)
          .json({ message: "No hay requerimientos", data: reqFileUser })
      res.json(reqFileUser)
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo obtener los requerimientos" })
    })
}

// Elegir
export const chosenQuote = async (req, res) => {
  try {
    const requestSent = await Request.findByIdAndUpdate(
      req.params.id,
      {
        state: 7,
        choice: req.body.choise,
        toBuyComments: req.body.toBuyComments,
      },
      { new: true }
    )
    if (!requestSent)
      return res.status(404).json({ message: "No se pudo enviar la eleccion" })
    return res.json(requestSent)
  } catch (error) {}
}

// <------------------------------------------------------>
// Rector Methods of the requirements ✅
export const getAllSentRequirements = async (req, res) => {
  getAllRequirements()
    .then((response) => {
      const reqFileUser = response.data.map((requeriment) => {
        if (requeriment.estado.id === 3) {
          return requeriment
        }
      })
      if (reqFileUser.length === 0)
        return res.status(200).json({ message: "No hay requerimientos" })
      res.json(reqFileUser)
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo obtener los requerimientos" })
    })
}
export const rectorResponse = async (req, res) => {
  const { id, comentaio_rector, estado } = req.body

  updateRequeriment({
    comentaio_rector,
    estado,
    id,
  })
    .then((response) => {
      res.json({
        message: "Requerimiento actualizado",
        data: response.data,
      })
    })
    .catch((error) => {
      if (error.response.status === 404) {
        console.log(error.response.data)
        return res.status(404).json({
          message: "No se encontró el requerimiento",
          data: error.response,
        })
      }
      res.status(400).json({
        message: "No se pudo actualizar el requerimiento",
        data: error.response.data,
      })
    })
}

// <------------------------------------------------------>
// Logistic Methodsof the requiremendts
export const getAllToQuoteRequirements = async (req, res) => {
  getAllRequirements()
    .then((response) => {
      const reqFileUser = response.data.map((requeriment) => {
        if (requeriment.estado.id === 4) {
          return requeriment
        }
      })
      if (reqFileUser.length === 0)
        return res.status(200).json({ message: "No hay requerimientos" })
      res.json(reqFileUser)
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo obtener los requerimientos" })
    })
}
export const logisticResponse = async (req, res) => {
  const files = [req.files.pdf1[0], req.files.pdf2[0], req.files.pdf3[0]]

  const formData = new FormData()
  files.forEach((file) => {
    const blob = new Blob([file.buffer], { type: file.mimetype })
    formData.append(`file`, blob, file.originalname)
  })

  logisticRes(req.body.id, formData)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      // console.log(error)
      if (error.response.status === 413) {
        return res.status(404).json({ message: "Limite de peso exedido" })
      }
    })
}

export const getAllToBuyRequirements = async (req, res) => {
  getAllRequirements()
    .then((response) => {
      const reqFileUser = response.data.map((requeriment) => {
        if (requeriment.estado.id === 7) {
          return requeriment
        }
      })
      if (reqFileUser.length === 0)
        return res.status(200).json({ message: "No hay requerimientos" })
      res.json(reqFileUser)
    })
    .catch((error) => {
      res.status(400).json({ message: "No se pudo obtener los requerimientos" })
    })
}

// <--------- Quoted Req ----------->
export const getQuotedRequeriments = async (req, res) => {
  getLogisticQuote(req.user.id)
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      res.status(400).json({
        message: "No se pudo obtener los requerimientos",
        data: error.response.data,
      })
    })
}
