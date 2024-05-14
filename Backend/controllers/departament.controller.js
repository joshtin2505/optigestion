import { departamento } from "../api/departaments.api.js"

export function getAllDepartaments(req, res) {
  departamento()
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data)
    })
}
