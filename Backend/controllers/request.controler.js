import Request from "../models/request.models.js"
import fs from "fs"

// Basics Methods of the requirements

// Obtener todos los requerimientos
export const getRequirements = async (req,res) => {
    try {
        const requirements = await Request.find({
            employeeId: req.user.employeeId
        })
        if (requirements.length === 0) return res.status(200).json({ message: "No hay requerimientos" })
        res.json(requirements)
    } catch (error) {
        console.log(error)
    }
}
// Obtener un solo requerimineto
export const getRequest = async (req,res) => {
    try {
        const request = await Request.findById(req.params.id)
        if (!request) return res.status(404).json({ message: "No se encontró el requerimiento" })
        res.json(request)
    } catch (error) {
        console.log(error)
    }

}
// Crear Requerimiento, lo que lo guarda como un borrador
export const createRequest = async(req,res) => {
    const { 
        title, 
        date, 
        description, 
        operativeComments,
         
    } = req.body

    const newRequest = new Request({
        title,
        date,
        description,
        employeeId: req.user.employeeId ,
        employeeFullName: req.user.fullName,
        departamentId: req.user.departamentId,
        operativeComments
    })
    console.log('Register')
    try {
        const reqSaved = await newRequest.save()
        res.json({
            message: 'Requerimiento creado',
            reqSaved
        })
    } catch (error) {
        console.log(error)
    }
}
// Actualizar un req ya creado - No se puede actualizar una ya en proceso(enviado, aprovado, cotizado)
export const updateRequest = async (req,res) => {

    try {
        const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!request) return res.status(404).json({ message: "No se encontró el requerimiento" })
        res.json(request)
    } catch (error) {
        console.log(error)
    }
}
// Eleimiar un req | solo si no esta ya en proceso 
export const deleteRequest = async(req,res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id)
        if (!request) return res.status(404).json({ message: "No se encontro el requerimiento" })
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
    }
}

// <------------------------------------------------------>
// Advanced Methods of the requirements

// Enciados
// Enviar si ya esta guardado
export const sendSavedRequest = async (req,res) => {
    try {
        const requestSent = await Request.findByIdAndUpdate(req.params.id, { state: 3 }, { new: true })
        if (!requestSent) return res.status(404).json({ message: "No se pudo enviar el requerimiento" })
        return res.json(requestSent)
    } catch (error) {
        console.log(error)
    }
}
//  Enviar si no esta guardado
export const sendNewRequest = async (req,res) => {
    try {
        // 
        const { 
            title, 
            date, 
            description, 
            operativeComments 
        } = req.body
    
        const newRequest = new Request({
            title,
            date,
            description,
            state: 3,
            employeeId: req.user.employeeId ,
            employeeFullName: req.user.fullName,
            departamentId: req.user.departamentId,
            operativeComments
        })
        
        try {
            const requestSent = await newRequest.save()
            if (!requestSent) return res.status(404).json({ message: "No se pudo enviar el requerimiento" })
            return res.json(requestSent)
        } catch (error) {
            console.log(error)
        }
        // 
    } catch (error) {
        console.log(error)
    }
}
export const getSent= async (req,res) => {
    try {
        const files = await Request.find({
            state: 3,
            employeeId: req.user.employeeId
        })
        if (!files) return res.status(200).json({ message: "No hay requerimientos" })
        res.json(files)
    } catch (error) {
        console.log(error)
    }
}

// Arcivado ✅
export const fileRequest = async (req,res) => {
    try {
        const getState = await Request.findById(req.params.id)
        if (!getState) return res.status(404).json({ message: "No se encontro el requerimiento"})

        if (getState.state === 1) {
            const requestFile = await Request.findByIdAndUpdate(req.params.id, { state: 2 }, { new: true })
            if (!requestFile) return res.status(404).json({ message: "No se pudo Archivar", state: requestFile.state })
            return res.json({ message: " se pudo Archivar", state: requestFile.state })
    }
    else if (getState.state === 2) {
        const requestFile = await Request.findByIdAndUpdate(req.params.id, { state: 1 }, { new: true })
        if (!requestFile) return res.status(404).json({ message: "No se pudo desArchivar", state: requestFile.state  })
        return res.json({ message: "se pudo desArchivar", state: requestFile.state })
        }
    return res.json({message: "No se puede archivar este requerimiento ya que es estatus: " + getState.state})
    } catch (error) {
        console.log(error)
    }
}
export const getFiles= async (req,res) => {
    try {
        const files = await Request.find({
            state: 2,
            employeeId: req.user.employeeId
        })
        if (!files) return res.status(200).json({ message: "No hay requerimientos" })
        res.json(files)
    } catch (error) {
        console.log(error)
    }
}


// Papelera ✅
export const trashRequest = async (req,res) => {
    try {
        const getState = await Request.findById(req.params.id)
        if (!getState) return res.status(404).json({ message: "No se encontro el requerimiento"})

        if (getState.state === 1) {
            const requestFile = await Request.findByIdAndUpdate(req.params.id, { state: 0 }, { new: true })
            if (!requestFile) return res.status(404).json({ message: "No se pudo mover a la Papelera", state: requestFile.state })
            return res.json({ message: "se pudo Mover a la Papelera", state: requestFile.state })
        }
        else if (getState.state === 2) {
            const requestFile = await Request.findByIdAndUpdate(req.params.id, { state: 0 }, { new: true })
            if (!requestFile) return res.status(404).json({ message: "No se pudo mover a la Papelera", state: requestFile.state  })
            return res.json({ message: "se pudo Mover a la Papelera", state: requestFile.state })
        }
        else if (getState.state === 0) {
            const requestFile = await Request.findByIdAndUpdate(req.params.id, { state: 1 }, { new: true })
            if (!requestFile) return res.status(404).json({ message: "No se pudo Restaurar", state: requestFile.state  })
            return res.json({ message: "se pudo Restaurar", state: requestFile.state })
        }
    return res.json({message: "No se puede mover a la papelera este requerimiento ya que esta en proceso: " + getState.state})
    } catch (error) {
        console.log(error)
    }
}
export const getTrash = async (req,res) => {
    try {
        const files = await Request.find({
            state: 0,
            employeeId: req.user.employeeId
        })
        if (!files) return res.status(200).json({ message: "No hay requerimientos" })
        res.json(files)
    } catch (error) {
        console.log(error)
    }
}

// Borrador ✅
export const getDraft = async (req,res) => {
    try {
        const files = await Request.find({
            state: 1,
            employeeId: req.user.employeeId
        })
        if (!files) return res.status(200).json({ message: "No hay requerimientos" })
        res.json(files)
    } catch (error) {
        console.log(error)
    }
}

// Respondidos
export const getAllAprovedRequirements = async (req,res) => {
    try {
        const requirements = await Request.find({
            state: 4,
            employeeId: req.user.employeeId
        })
        if (!requirements || requirements.length === 0) return res.status(200).json({ message: "No hay requerimientos para cotizar" })
        res.json(requirements)
    } catch (error) {
        console.log(error)
    }
}

export const getAllRejectedRequirements = async (req,res) => {
    try {
        const requirements = await Request.find({
            state: 5,
            employeeId: req.user.employeeId
        })
        if (!requirements || requirements.length === 0) return res.status(200).json({ message: "No hay requerimientos rechazados" })
        res.json(requirements)
    } catch (error) {
        console.log(error)
    }
}

// <------------------------------------------------------>
// Rector Methods of the requirements
export const getAllRequirements = async (req,res) => {
    try {
        const requirements = await Request.find({
            state: 3
        })
        if (!requirements) return res.status(200).json({ message: "No hay requerimientos para aprovar" })
        res.json(requirements)
    } catch (error) {
        console.log(error)
    }
}
export const rectorResponse = async (req,res) => {
    try {
        const requirements = await Request.find({
            state: 3,
            _id: req.params.id
        })
        if (!requirements) return res.status(404).json({ message: "No se encontró el requerimiento" })
        
        const response = Number(req.query.res )

        if(response == 1){
            const requestApprove = await Request.findByIdAndUpdate(req.params.id, { state: 4, rectorComment: req.body.rectorComment }, { new: true })
            if (!requestApprove) return res.status(404).json({ message: "No se pudo aprobar el requerimiento" })
            return res.json({ message: "Requerimiento aprobado", state: requestApprove.state, rectorComment: requestApprove.rectorComment})
        }
        if(response === 0){
            const requestReject = await Request.findByIdAndUpdate(req.params.id, { state: 5, rectorComment: req.body.rectorComment }, { new: true })
            if (!requestReject) return res.status(404).json({ message: "No se pudo rechazar el requerimiento" })
            return res.json({ message: "Requerimiento rechazado", state: requestReject.state, rectorComment: requestReject.rectorComment})
        }
    } catch (error) {
        console.log(error)
    }
}

// <------------------------------------------------------>
// Logistic Methodsof the requiremendts

export const logisticResponse = async (req,res) => {
    try {
        const requirements = await Request.find({
            state: 4,
            _id: req.params.id
        })
        if (!requirements) return res.status(404).json({ message: "No se encontró el requerimiento" })
        
        const response = Number(req.query.res )
        
        const firstPrices = fs.readFile(req.body.firstPrices)
        const secondPrices = fs.readFile(req.body.secondPrices)
        const thirdPrices  = fs.readFile(req.body.thirdPrices)
        if(response == 1){
            const requestApprove = await Request.findByIdAndUpdate(req.params.id, { 
                state: 6, 
                logisticComments: req.body.logisticComments, 
                firstPrices, 
                secondPrices, 
                thirdPrices 
            }, { new: true })
            if (!requestApprove) return res.status(404).json({ message: "No se pudo enviar la cotización" })
            return res.json({ message: "Requerimiento aprobado", state: requestApprove.state, logisticComments: requestApprove.logisticComments})
        }
    } catch (error) {
        console.log(error)
    }
}