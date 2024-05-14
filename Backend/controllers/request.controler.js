import {
  addRequest,
  getAllRequirements,
  getRequerimentById,
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
      console.log(error)
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
      console.log(error)
      res.status(400).json({ message: "No se pudo obtener el requerimiento" })
    })
}
// Crear Requerimiento, lo que lo guarda como un borrador ✅
export const createRequest = async (req, res) => {
  const { titulo, descripcion, estado, tipoRequerimiento } = req.body
  addRequest({
    titulo,
    descripcion,
    estado,
    usuario: req.user.id,
    tipoRequerimiento,
  })
    .then((response) => {
      console.log("Register")
      res.json({
        message: "Requerimiento creado",
        data: response.data,
      })
    })
    .catch((error) => {
      console.log(error)
      console.log("--------------------\n", {
        titulo,
        descripcion,
        estado,
        usuario: req.user.id,
        tipoRequerimiento,
      })
      res.status(400).json({ message: "No se pudo crear el requerimiento" })
    })
}
// Actualizar un req ya creado - No se puede actualizar una ya en proceso(enviado, aprovado, cotizado) ✅
export const updateRequest = async (req, res) => {
  const id = req.params.id
  console.log({
    ...req.body,
    id,
  })
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
      console.log(error)
      res
        .status(400)
        .json({ message: "No se pudo actualizar el requerimiento" })
    })
}
// Eleimiar un req | solo si no esta ya en proceso ✅
export const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id)
    if (!request)
      return res
        .status(404)
        .json({ message: "No se encontro el requerimiento" })
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
  }
}

// <------------------------------------------------------>
// Advanced Methods of the requirements

// Enciados ✅
// Enviar si ya esta guardado
export const sendSavedRequest = async (req, res) => {
  try {
    const requestSent = await Request.findByIdAndUpdate(
      req.params.id,
      { state: 3 },
      { new: true }
    )
    if (!requestSent)
      return res
        .status(404)
        .json({ message: "No se pudo enviar el requerimiento" })
    return res.json(requestSent)
  } catch (error) {
    console.log(error)
  }
}
//  Enviar si no esta guardado
export const sendNewRequest = async (req, res) => {
  try {
    //
    const { title, date, description, operativeComments } = req.body

    const newRequest = new Request({
      title,
      date,
      description,
      state: 3,
      employeeId: req.user.employeeId,
      employeeFullName: req.user.fullName,
      departamentId: req.user.departamentId,
      operativeComments,
    })

    try {
      const requestSent = await newRequest.save()
      if (!requestSent)
        return res
          .status(404)
          .json({ message: "No se pudo enviar el requerimiento" })
      return res.json(requestSent)
    } catch (error) {
      console.log(error)
    }
    //
  } catch (error) {
    console.log(error)
  }
}
export const getSent = async (req, res) => {
  try {
    const files = await Request.find({
      state: 3,
      employeeId: req.user.employeeId,
    })
    if (!files)
      return res.status(200).json({ message: "No hay requerimientos" })
    res.json(files)
  } catch (error) {
    console.log(error)
  }
}

// Arcivado ✅
export const fileRequest = async (req, res) => {
  try {
    const getState = await Request.findById(req.params.id)
    if (!getState)
      return res
        .status(404)
        .json({ message: "No se encontro el requerimiento" })

    if (getState.state === 1) {
      const requestFile = await Request.findByIdAndUpdate(
        req.params.id,
        { state: 2 },
        { new: true }
      )
      if (!requestFile)
        return res
          .status(404)
          .json({ message: "No se pudo Archivar", state: requestFile.state })
      return res.json({
        message: " se pudo Archivar",
        state: requestFile.state,
      })
    } else if (getState.state === 2) {
      const requestFile = await Request.findByIdAndUpdate(
        req.params.id,
        { state: 1 },
        { new: true }
      )
      if (!requestFile)
        return res
          .status(404)
          .json({ message: "No se pudo desArchivar", state: requestFile.state })
      return res.json({
        message: "se pudo desArchivar",
        state: requestFile.state,
      })
    }
    return res.json({
      message:
        "No se puede archivar este requerimiento ya que es estatus: " +
        getState.state,
    })
  } catch (error) {
    console.log(error)
  }
}
export const getFiles = async (req, res) => {
  try {
    const files = await Request.find({
      state: 2,
      employeeId: req.user.employeeId,
    })
    if (!files)
      return res.status(200).json({ message: "No hay requerimientos" })
    res.json(files)
  } catch (error) {
    console.log(error)
  }
}

// Papelera ✅
export const trashRequest = async (req, res) => {
  try {
    const getState = await Request.findById(req.params.id)
    if (!getState)
      return res
        .status(404)
        .json({ message: "No se encontro el requerimiento" })

    if (getState.state === 1) {
      const requestFile = await Request.findByIdAndUpdate(
        req.params.id,
        { state: 0 },
        { new: true }
      )
      if (!requestFile)
        return res.status(404).json({
          message: "No se pudo mover a la Papelera",
          state: requestFile.state,
        })
      return res.json({
        message: "se pudo Mover a la Papelera",
        state: requestFile.state,
      })
    } else if (getState.state === 2) {
      const requestFile = await Request.findByIdAndUpdate(
        req.params.id,
        { state: 0 },
        { new: true }
      )
      if (!requestFile)
        return res.status(404).json({
          message: "No se pudo mover a la Papelera",
          state: requestFile.state,
        })
      return res.json({
        message: "se pudo Mover a la Papelera",
        state: requestFile.state,
      })
    } else if (getState.state === 0) {
      const requestFile = await Request.findByIdAndUpdate(
        req.params.id,
        { state: 1 },
        { new: true }
      )
      if (!requestFile)
        return res
          .status(404)
          .json({ message: "No se pudo Restaurar", state: requestFile.state })
      return res.json({
        message: "se pudo Restaurar",
        state: requestFile.state,
      })
    }
    return res.json({
      message:
        "No se puede mover a la papelera este requerimiento ya que esta en proceso: " +
        getState.state,
    })
  } catch (error) {
    console.log(error)
  }
}
export const getTrash = async (req, res) => {
  try {
    const files = await Request.find({
      state: 0,
      employeeId: req.user.employeeId,
    })
    if (!files)
      return res.status(200).json({ message: "No hay requerimientos" })
    res.json(files)
  } catch (error) {
    console.log(error)
  }
}

// Borrador ✅
export const getDraft = async (req, res) => {
  try {
    const files = await Request.find({
      state: 1,
      employeeId: req.user.employeeId,
    })
    if (!files)
      return res.status(200).json({ message: "No hay requerimientos" })
    res.json(files)
  } catch (error) {
    console.log(error)
  }
}

// Respondidos ✅
export const getAllAprovedRequirements = async (req, res) => {
  try {
    const requirements = await Request.find({
      state: { $in: [4, 6] },
      employeeId: req.user.employeeId,
    })
    if (!requirements || requirements.length === 0)
      return res
        .status(200)
        .json({ message: "No hay requerimientos para cotizar" })
    res.json(requirements)
  } catch (error) {
    console.log(error)
  }
}

export const getAllRejectedRequirements = async (req, res) => {
  try {
    const requirements = await Request.find({
      state: 5,
      employeeId: req.user.employeeId,
    })
    if (!requirements || requirements.length === 0)
      return res
        .status(200)
        .json({ message: "No hay requerimientos rechazados" })
    res.json(requirements)
  } catch (error) {
    console.log(error)
  }
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
  } catch (error) {
    console.log(error)
  }
}

// <------------------------------------------------------>
// Rector Methods of the requirements ✅
export const getAllSentRequirements = async (req, res) => {
  try {
    const requirements = await Request.find({
      state: 3,
    })
    if (!requirements)
      return res
        .status(200)
        .json({ message: "No hay requerimientos para aprovar" })
    res.json(requirements)
  } catch (error) {
    console.log(error)
  }
}
export const rectorResponse = async (req, res) => {
  try {
    const requirements = await Request.find({
      state: 3,
      _id: req.params.id,
    })
    if (!requirements)
      return res
        .status(404)
        .json({ message: "No se encontró el requerimiento" })

    const response = Number(req.body.res)

    if (response === 1) {
      const requestApprove = await Request.findByIdAndUpdate(
        req.params.id,
        { state: 4, rectorComment: req.body.rectorComment },
        { new: true }
      )
      if (!requestApprove)
        return res
          .status(404)
          .json({ message: "No se pudo aprobar el requerimiento" })
      return res.json({
        message: "Requerimiento aprobado",
        state: requestApprove.state,
        rectorComment: requestApprove.rectorComment,
      })
    }
    if (response === 0) {
      const requestReject = await Request.findByIdAndUpdate(
        req.params.id,
        { state: 5, rectorComment: req.body.rectorComment },
        { new: true }
      )
      if (!requestReject)
        return res
          .status(404)
          .json({ message: "No se pudo rechazar el requerimiento" })
      return res.json({
        message: "Requerimiento rechazado",
        state: requestReject.state,
        rectorComment: requestReject.rectorComment,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

// <------------------------------------------------------>
// Logistic Methodsof the requiremendts
export const getAllToQuoteRequirements = async (req, res) => {
  try {
    const requirements = await Request.find({
      state: 4,
    })
    if (requirements.length === 0)
      return res.status(200).json({ message: "No hay requerimientos" })
    res.json(requirements)
  } catch (error) {
    console.log(error)
  }
}
export const logisticResponse = async (req, res) => {
  try {
    const requirements = await Request.find({
      state: 4,
      _id: req.body.id,
    })
    if (!requirements)
      return res
        .status(404)
        .json({ message: "No se encontró el requerimiento" })

    const firstPrices = req.files.pdf1[0].buffer
    const firstPricesName = req.files.pdf1[0].originalname
    const secondPrices = req.files.pdf2[0].buffer
    const secondPricesName = req.files.pdf2[0].originalname
    const thirdPrices = req.files.pdf3[0].buffer
    const thirdPricesName = req.files.pdf3[0].originalname

    const requestQuote = await Request.findByIdAndUpdate(
      req.body.id,
      {
        state: 6,
        firstPrices,
        firstPricesName,
        secondPrices,
        secondPricesName,
        thirdPrices,
        thirdPricesName,
      },
      { new: true }
    )
    if (!requestQuote)
      return res
        .status(404)
        .json({ message: "No se pudo enviar la cotización" })
    return res.json(requestQuote)
  } catch (error) {
    console.log(error)
  }
}
export const getAllToBuyRequirements = async (req, res) => {
  try {
    const requirements = await Request.find({
      state: 7,
    })
    if (requirements.length === 0)
      return res.status(200).json({ message: "No hay requerimientos" })
    res.json(requirements)
  } catch (error) {
    console.log(error)
  }
}
