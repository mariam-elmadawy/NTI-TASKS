const fs = require("fs")
class Handler {
    static responseHandler = (res, status, apiStatus, data, message) => {
        res.status(status).send({ apiStatus, data, message })
    }
    static resFile = (req) => {
        const ext = req.file.originalname.split(".").pop()
        const newName = req.file.path + "." + ext
        fs.renameSync(req.file.path, newName)
        return ext
    }
}
module.exports = Handler