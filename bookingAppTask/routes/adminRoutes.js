const router = require("express").Router()
const auth = require("../app/middleware/authMiddleware")
const adminController = require("../app/controllers/adminController")
router.post("/register", adminController.register)
router.post("/login", adminController.login)
router.post("/logout", auth, adminController.logout)
module.exports = router