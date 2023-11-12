import Request from "../models/request.models.js"

export const getRequirements = async (req,res) => {
    const requirements = await Request.find()
    res.json(requirements)
}
export const getRequest = (req,res) => {

}
export const createRequest = async(req,res) => {
    const { title, date, description, state, employeeId, employeeFullName, departamentId, operativeComments } = req.body

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
    const reqSaved = await newRequest.save()
    res.json(reqSaved)
}
export const updateRequest = (req,res) => {
    res.send('Pagina de borrador')
}
export const deleteRequest = (req,res) => {
    res.send('Pagina de borrador')
}