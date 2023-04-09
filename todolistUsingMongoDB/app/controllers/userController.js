const deal = require("../helper/readWriteData")
const filename = "models/allData.json"
const connectDB = require("../../models/serverdb")
const ObjectId = require("mongodb").ObjectId
class userController {
    static addData = (req, res) => {
        res.render("addData", {
            pageTitle: "add todo page"
        }
        )
    }
    static home = (req, res) => {
        try {
            connectDB(async (db) => {
                const allData = await db.collection("todos").find().toArray()
                res.render("home", {
                    pageTitle: "todo page",
                    allData,
                    hasData: allData.length
                })
            })


        } catch (e) { res.send(e.message) }
    }
    static addTodo = (req, res) => {
        try {
            connectDB(async (db) => {
                await db.collection("todos").insertOne(req.query)
            })
            res.redirect("/")
        } catch (e) { res.send(e) }

    }

    static show = (req, res) => {
        try {
            connectDB(async (db) => {
                const data = await db.collection("todos").findOne({
                    _id: new ObjectId(req.params.id)
                })
                res.render("show", {
                    pageTitle: "show single Data",
                    data
                })
            })

        } catch (e) {
            res.send(e)
        }
    }
    static edit = (req, res) => {
        try {
            connectDB(async (db) => {
                const data = await db.collection("todos").findOne({
                    _id: new ObjectId(req.params.id)
                })
                res.render("edit", {
                    pageTitle: "edit Data",
                    data
                })
            })
        } catch (e) {
            res.send(e.message)
        }
    }
    static editTodo = (req, res) => {
        try {
            connectDB(async (db) => {
                await db.collection("todos").updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: req.query }
                );
                res.redirect(`/show/${req.params.id}`)
            })
        } catch (e) { res.send(e.message) }

    }
    static delete = (req, res) => {
        try {
            connectDB(async (db) =>
                await db.collection("todos")
                    .deleteOne({ _id: new ObjectId(req.params.id) })
            )
            res.redirect("/")
        }
        catch (e) {
            res.send(e.message)
        }
    }

    static status = (req, res) => {
        try {
            connectDB(async (db) => {
                await db.collection("todos").updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: { status: "Active" } }
                );
            })
            res.redirect("/")
        } catch (e) { res.send(e.message) }

    }

    static search = (req, res) => {
        let search = req.query.search;
        let results = [];
        try {
            connectDB(async (db) => {
                await db.collection("todos").find({ $or: [{ title: { $regex: search } }, { content: { $regex: search } }] }).toArray(function (err, result) {
                    result.forEach(element => {
                        results.push(element);
                    });
                    res.render("search", {
                        results,
                        hasData: results.length,
                    })
                })

            })

        } catch (e) { res.send(e.message) }

    }
}
module.exports = userController

