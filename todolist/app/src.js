const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const userRouter = require("./routers/userRouters")

//static files dir
const publicDir = path.join(__dirname, "../resources/public")
const layoutDir = path.join(__dirname, "../resources/layouts")
const viewsDir = path.join(__dirname, "../resources/views")

app.use(express.static(publicDir))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", 'hbs')
app.set("views", viewsDir)
hbs.registerPartials(layoutDir)
app.use(userRouter)
app.all("*", (req, res) => {
    res.render("error", {
        pageTitle: "error 404"
    })
})
module.exports = app