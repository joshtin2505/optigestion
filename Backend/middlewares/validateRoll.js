export const authRectorRoll = (req, res, next) => {
    if (req.user.roll !== 1)return res.status(401).json({message: 'Unauthorized'})
    next()
}
export const authLogisticRoll = (req, res, next) => {
    if (req.user.roll !== 2)return res.status(401).json({message: 'Unauthorized'})
    next()
}