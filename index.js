const express = require("express")
var cors = require('cors')
var cookieParser = require('cookie-parser')

const database = require("./config/database");
const Task = require("./models/task.model")
require("dotenv").config()
const app = express()
const port = process.env.PORT
const routeApiver1 = require("./api/v1/routes/index.route")

const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

database.connect()
routeApiver1(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})