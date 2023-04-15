const router = require("express").Router()
const userController = require("../app/controllers/userController")
const userAuth = require("../app/middleware/userMiddleware")
router.post("/register", userController.register)
router.post("/login", userAuth, userController.login)
router.post("/logout", userAuth, userController.logout)
//show one or all users
router.get('/showAll', userController.viewAllUsers)
router.get('/show/:id', userController.viewOneUser)
router.get('/me', userAuth, userController.profile)
//update user rexord
router.patch('/show/:id', userController.updateUser)
//delete one or all users
router.delete('/', userController.delAllUsers)
router.delete('/show/:id', userController.deleteUser)
module.exports = router