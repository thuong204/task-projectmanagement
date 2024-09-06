const express= require("express")
const controller =require("../../../controllers/user.controller")
const requireAuth = require("../middlewares/auth.middlware")
const router = express.Router()
router.post("/register", controller.register)
router.post("/login",controller.login)
router.post("/password/forgot", controller.forgotPassword)
router.post("/password/otp", controller.otpPassword)
router.post("/password/reset", controller.resetPassword)
router.get("/detail",requireAuth.requireAuth, controller.detail)
router.get("/list",requireAuth.requireAuth,controller.listUser)
module.exports = router