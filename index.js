const express = require("express")
const database = require("./config/database");
const Task = require("./models/task.model")
require("dotenv").config()
const app = express()
const port = process.env.PORT
const routeApiver1 = require("./api/v1/routes/index.route")

const bodyParser = require("body-parser")

app.use(bodyParser.json())

database.connect()
routeApiver1(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})