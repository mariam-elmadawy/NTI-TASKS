
const express = require("express")
const Handler = require("./helper")
//GET INSTANCE FROM EXPRESS
const app = express()
//CONNECT INTO THE SERVER DB
require("../database/serverDB")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app routes
const adminRoutes = require("../routes/adminRoutes")
app.use("/api/admin/", adminRoutes)
const userRoutes = require("../routes/userRoutes")
app.use("/api/user/", userRoutes)
const hotelRoutes = require("../routes/hotelRoutes")
app.use("/api/hotel/", hotelRoutes)

app.all("*", (req, res) =>
    Handler.responseHandler(res, 404, false, null, 'url not found')
)
module.exports = app