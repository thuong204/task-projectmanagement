const Task = require("../models/task.model")
const pagination = require("../helpers/pagination")
const searchHelper = require("../helpers/search")
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status
    }
    const sort = {}
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    //Pagination
    const initPagination = {
        currentPage: 1,
        limitItems: 2
    }
    const countTasks = await Task.countDocuments(find)
    const objectPagination = pagination(initPagination, req.query, countTasks)

    //End pagination


    //Search
    const objectSearch = searchHelper(req.query)
    if (req.query.keyword) {
        find.title = objectSearch.regex
    }
    const task = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip)
    res.json(task)

}
module.exports.detail = async (req, res) => {
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

}
module.exports.changeStatus = async (req, res) => {

    try {
        const id = req.params.id
        const status = req.body.status
        await Task.updateOne({
            _id: id
        }, {
            status: status

        })

        res.json({
            code: 200,
            message: "Cập nhật trạng thái thanhff công"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại"
        })

    }

}
