class Handler {
    static responseHandler = (res, status, apiStatus, data, message) => {
        res.status(status).send({ apiStatus, data, message })
    }
}
module.exports = Handler