const deal = require("../helper/readWriteData")
const filename = "models/allData.json"
class userController {
    static home = (req, res) => {
        const allData = deal.readJsonData(filename)
        res.render('home', {
            pageTitle: "home page",
            allData,
            hasData: allData.length
        })
    }
    static addTodo = (req, res) => {

        const allData = deal.readJsonData(filename)
        const newData = { id: Date.now(), date: new Date(), ...req.query }
        allData.push(newData)
        deal.writeJsonData(filename, allData)
        res.redirect("/")
    }
    static addData = (req, res) => {
        res.render("addData", {
            pageTitle: "add todo page"
        }
        )
    }
    static show = (req, res) => {
        const allData = deal.readJsonData(filename)
        const id = req.params.id
        const data = allData.find(t => t.id == id)
        res.render("show", {
            pageTitle: "Show todo single Data",
            data
        })
    }
    static edit = (req, res) => {
        const allData = deal.readJsonData(filename)
        const id = req.params.id
        const data = allData.find(t => t.id == id)
        res.render("edit", {
            pageTitle: "Edit Todo Data",
            data
        })
    }
    static editTodo = (req, res) => {
        const allData = deal.readJsonData(filename)
        const id = req.params.id
        const index = allData.findIndex(t => t.id == id)
        allData[index] = { id, ...req.query, date: new Date() }
        deal.writeJsonData(filename, allData)
        res.redirect(`/show/${id}`)
    }
    static delete = (req, res) => {
        let allData = deal.readJsonData(filename)
        const id = req.params.id
        const index = allData.findIndex(i => i.id == id)
        allData.splice(index, 1)
        deal.writeJsonData(filename, allData)
        res.redirect("/")
    }
    static status = (req, res) => {
        const allData = deal.readJsonData(filename)
        const id = req.params.id
        const index = allData.findIndex(t => t.id == id)
        let status = 'Active';
        // console.log(allData[index].status);
        if (allData[index].status === 'Inactive') {
            allData[index].status = status
            deal.writeJsonData(filename, allData)
            res.redirect("/")
        }
    }
    static search = (req, res) => {
        let search = req.query.search;
        let results = [];
        const allData = deal.readJsonData(filename)

        for (var i = 0; i < allData.length; i++) {
            if (allData[i].title.includes(search) || allData[i].content.includes(search)) {
                results.push(allData[i])
            }
        }
        res.render("search", {
            results,
            hasData: results.length
        })
    }
}
module.exports = userController

