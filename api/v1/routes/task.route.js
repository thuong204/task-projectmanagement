const express = require("express")
const Task = require("../../../models/task.model")
const pagination = require("../../../helpers/pagination")
const router = express.Router()
router.get("/", async (req, res) => {
        const find   = {
            deleted: false
        }
        if(req.query.status){
            find.status = req.query.status
        }
        const sort = {}
        if(req.query.sortKey && req.query.sortValue){
            sort[req.query.sortKey] = req.query.sortValue
        }
        //Pagination
        const initPagination = {
            currentPage: 1,
            limitItems: 2
        }
        const countTasks = await Task.countDocuments(find)
        const objectPagination = pagination(initPagination,req.query,countTasks)

        //End pagination
        const task = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip)
        res.json(task)
})
router.get("/detail/:id", async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findOne({
            _id: id,
            deleted: false
        })
        res.json(task)
    } catch (error) {
        res.json("Khoog tim thay")

    }

})
module.exports =router