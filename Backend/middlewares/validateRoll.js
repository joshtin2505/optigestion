export const authRectorRoll = (req, res, next) => {
    if (req.user.roll !== 1)return res.status(401).json({message: 'Unauthorized', rol: req.user.role})

    next()
}
export const authLogisticRoll = (req, res, next) => {
    if (req.user.role !== 2)return res.status(401).json({message: 'Unauthorized'})
    next()
}