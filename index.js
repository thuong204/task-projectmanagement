const express = require("express")
const database = require("./config/database");
const Task = require("./models/task.model")
require("dotenv").config()
const app = express()
const port = process.env.PORT

database.connect()
app.get("/tasks/detail/:id", async (req, res) => {
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
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})