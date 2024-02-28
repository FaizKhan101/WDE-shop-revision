exports.addCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}