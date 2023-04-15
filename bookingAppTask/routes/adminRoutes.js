const router = require("express").Router()
const auth = require("../app/middleware/authMiddleware")
const adminController = require("../app/controllers/adminController")
router.post("/register", adminController.register)
router.post("/login", auth, adminController.login)
router.post("/logout", auth, adminController.logout)
router.get('/', adminController.viewAll)
router.get('/show/:id', adminController.viewOne)
//update admin
router.patch('/show/:id', adminController.update)
//delete one or all admins
router.delete('/', adminController.delAll)
router.delete('/show/:id', adminController.delete)
module.exports = router