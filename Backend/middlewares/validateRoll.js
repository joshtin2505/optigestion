export const authRectorRoll = (req, res, next) => {
    console.log(req.user.roll)

    if (req.user.roll !== 1 && req.user.roll !== 0)return res.status(401).json({message: 'Unauthorized'})
    next()
}
export const authLogisticRoll = (req, res, next) => {
    if (req.user.roll !== 2 && req.user.roll !== 0)return res.status(401).json({message: 'Unauthorized'})
    next()
}