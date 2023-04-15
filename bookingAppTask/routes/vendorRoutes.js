const router = require("express").Router()
const vendorController = require("../app/controllers/vendorController")
const vendorAuth = require("../app/middleware/vendorMiddleware")
router.post("/register", vendorController.register)
router.post("/login", vendorAuth, vendorController.login)
router.post("/logout", vendorAuth, vendorController.logout)
//view
router.get('/show/:id', vendorController.view)
//update 
router.patch('/show/:id', vendorController.update)
//delete one 
router.delete('/show/:id', vendorController.delete)
module.exports = router