const router = require("express").Router()
const roomController = require("../app/controllers/roomController")
const vendorAuth = require("../app/middleware/vendorMiddleware")
//add new
router.post("/", vendorAuth, roomController.newRoom)
router.get("/myRooms", vendorAuth, roomController.myRooms)
//show 
router.get("/showAll", roomController.viewAllRooms)
router.get("/show/:id", vendorAuth, roomController.viewOneRoom)
//update
router.patch("/show/:id", roomController.updateRoom)
//delete 
router.delete("/show/:id", roomController.deleteRoom)
router.delete("/", roomController.delAllRooms)
module.exports = router