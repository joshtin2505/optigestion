import Request from "../models/request.models.js"

// Basics Methods of the requirements
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
export const getRequest = async (req,res) => {
    try {
        const request = await Request.findById(req.params.id)
        if (!request) return res.status(404).json({ message: "No se encontró el requerimiento" })
        res.json(request)
    } catch (error) {
        console.log(error)
    }

}
export const createRequest = async(req,res) => {
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
        employeeId: req.user.employeeId ,
        employeeFullName: req.user.fullName,
        departamentId: req.user.departamentId,
        operativeComments
    })
    
    try {
        const reqSaved = await newRequest.save()
        res.json(reqSaved)
    } catch (error) {
        console.log(error)
    }
}
export const updateRequest = async (req,res) => {

    try {
        const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!request) return res.status(404).json({ message: "No se encontró el requerimiento" })
        res.json(request)
    } catch (error) {
        console.log(error)
    }
}
export const deleteRequest = async(req,res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id)
        if (!request) return res.status(404).json({ message: "No se encontro el requerimiento" })
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
    }
}
// Advanced Methods of the requirements
export const sendSavedRequest = async (req,res) => {
    try {
        const requestSent = await Request.findByIdAndUpdate(req.params.id, { state: 3 }, { new: true })
        if (!requestSent) return res.status(404).json({ message: "No se pudo enviar el requerimiento" })
        return res.json(requestSent)
    } catch (error) {
        console.log(error)
    }
}
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
export const deleteAllRequest = async(req,res) => {
    try {
        const requirements = await Request.deleteMany()
        if (!requirements) return res.status(404).json({ message: "No se encontraron requerimientos" })
        res.sendStatus(204)

    } catch (error) {
        console.log(error)
    }
}

// Rector Methods of the requirements
export const getAllRequirements = async (req,res) => {
    try {
        const requirements = await Request.find({
            state: 3
        })
        if (requirements.length === 0) return res.status(200).json({ message: "No hay requerimientos" })
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