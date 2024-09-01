const express = require("express")
const database = require("./config/database");
const Task = require("./models/task.model")
require("dotenv").config()
const app = express()
const port = process.env.PORT
const route = require("./api/v1/routes/index.route")

database.connect()
route(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})