const router = require("express").Router()
const hotelController = require("../app/controllers/hotelController")
//add new hotel record
router.post("/", hotelController.newHotel)
//show single and all hotels
router.get("/showAll", hotelController.viewAllHotels)
router.get("/show/:id", hotelController.viewOneHotel)
//update single hotel
router.patch("/show/:id", hotelController.updateHotel)
//delete one and all hotels
router.delete("/show/:id", hotelController.deleteHotel)
router.delete("/", hotelController.delAllHotels)
module.exports = router