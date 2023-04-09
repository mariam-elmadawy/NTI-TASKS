const deal = require("../helper/readWriteData")
const filename = "models/allData.json"
const appModel = require("../../db/models/appModels")
class userController {
    static home = async (req, res) => {
        try {
            const allData = await appModel.find() //return all data that in the collection
            res.render("home", {
                pageTitle: "all Data",
                allData,
                hasData: allData.length
            })
        } catch (e) { res.send(e.message) }
    }
    static addTodo = async (req, res) => {
        try {
            const data = new appModel(req.query)
            await data.save()
            res.redirect("/")
        } catch (e) {
            res.send(e)
        }

    }
    static addData = (req, res) => {
        res.render("addData", {
            pageTitle: "add todo page"
        }
        )
    }
    static show = async (req, res) => {
        try {
            const data = await appModel.findById(req.params.id)
            res.render("show", {
                pageTitle: "single Data",
                data
            })
        } catch (e) {
            res.send(e.message)
        }
    }
    static edit = async (req, res) => {
        try {
            const data = await appModel.findById(req.params.id)
            res.render("edit", {
                pageTitle: "edit Data",
                data
            })
        } catch (e) {
            res.send(e.message)
        }

    }
    static editTodo = async (req, res) => {
        try {
            await appModel.findByIdAndUpdate(req.params.id, req.query)
            res.redirect(`/show/${req.params.id}`)
        } catch (e) {
            res.send(e.message)
        }
    }
    static delete = async (req, res) => {
        try {
            await appModel.findByIdAndDelete(req.params.id)
            res.redirect("/")
        } catch (e) {
            res.send(e.message)
        }
    }
    static status = async (req, res) => {
        try {
            await appModel.findByIdAndUpdate(req.params.id, { $set: { status: true } })
            res.redirect("/")
        } catch (e) { res.send(e.message) }
        // let status = 'Active';
        // console.log(allData[index].status);
        // if (allData[index].status === 'Inactive') {
        //     allData[index].status = status
        //     deal.writeJsonData(filename, allData)
        //     res.redirect("/")
        // }
    }
    // { title: new RegExp(search, 'i'), content: new RegExp(search, 'i') }
    static search = async (req, res) => {
        let search = req.query.search;
        let results = [];
        try {
            const data = await appModel.find({ $or: [{ title: new RegExp(search) }, { content: new RegExp(search)}] }).exec();
            data.forEach(element => {
                results.push(element);
            });
            res.render("search", {
                results,
                hasData: results.length
            })
        } catch (e) {
            res.send(e.message)
        }

    }
}
module.exports = userController

