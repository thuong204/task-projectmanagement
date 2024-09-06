const taskRoutes =  require("./task.route")
const userRoutes = require("./users.route")
const requireAuth = require("../middlewares/auth.middlware")
module.exports =(app) =>{
    const version ="/api/v1"
    app.use(version+"/tasks",requireAuth.requireAuth,taskRoutes)
    app.use(version+"/users",userRoutes)

}
