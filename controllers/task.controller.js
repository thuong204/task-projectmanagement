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
        limitItems: 10
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
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value } = req.body
        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                })
                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thanhff công"
                })
                break;
            case "delete":
                await Task.deleteMany({
                    _id: { $in: ids }
                })
                res.json({
                    code: 200,
                    message: "Xóa nhiều công viêc thành công"
                })
                break;

            default:

                res.json({
                    code: 400,
                    message: "Không tồn tại"
                })
                break;
        }
    } catch (error) {

    }
}
module.exports.create = async (req, res) => {
    try {
        const task = new Task(req.body)
        const data = await task.save()
        res.json({
            code: 200,
            message: "Thêm công việc thành công",
            data: data
        })

    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        })

    }

}
module.exports.update = async (req, res) => {
    try {
        await Task.updateOne({
            _id: req.params.id
        },req.body)
        res.json({
            code: 200,
            message: "Cập nhật công việc thành công"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        })

    }

}
module.exports.delete= async (req, res) => {
    try {
        await Task.deleteOne({_id: req.params.id})
        res.json({
            code: 200,
            message: "Xóa công việc thành công"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        })

    }

}
