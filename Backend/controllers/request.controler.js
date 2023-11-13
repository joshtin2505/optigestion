import Request from "../models/request.models.js"

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
        state, 
        operativeComments 
    } = req.body

    const newRequest = new Request({
        title,
        date,
        description,
        state,
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
export const deleteAllRequest = async(req,res) => {
    try {
        const requirements = await Request.deleteMany()
        if (!requirements) return res.status(404).json({ message: "No se encontraron requerimientos" })
        res.sendStatus(204)

    } catch (error) {
        console.log(error)
    }
}