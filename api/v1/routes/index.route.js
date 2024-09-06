const taskRoutes =  require("./task.route")
const userRoutes = require("./users.route")
module.exports =(app) =>{
    const version ="/api/v1"
    app.use(version+"/tasks",taskRoutes)
    app.use(version+"/users",userRoutes)

}
