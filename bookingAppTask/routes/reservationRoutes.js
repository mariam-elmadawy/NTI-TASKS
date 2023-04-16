const router = require("express").Router()
const reservationController = require("../app/controllers/reservationController")

router.post("/", reservationController.newReservation)
router.get("/showAll", reservationController.showAllReservations)
router.get("/show/:id", reservationController.showReservation)
router.patch("/show", reservationController.updateReservation)
router.delete("/showAll", reservationController.delAllReservations)
router.delete("/show/:id", reservationController.delReservation)
module.exports = router