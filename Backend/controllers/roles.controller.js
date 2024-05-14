import { roles } from "../api/role.api.js"

export function getAllRoles(req, res) {
  roles()
    .then((response) => {
      res.status(response.status).json(response.data)
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data)
    })
}
