const User = require("../models/user.model")
const ForgotPassword  = require("../models/forgot-password.model")
const sendMailHelper = require("../helpers/sendmail")
const generate = require("../helpers/generate")
module.exports.register = async (req, res) => {
    try {
        const existEmail = await User.findOne({
            email: req.body.email,
            deleted: false
        })
        if (existEmail) {
            res.json({
                code: 400,
                message: "Lỗi. Email đã tồn tại"
            })
            return;
        }
        const user = new User(req.body)
        await user.save()
        const token = user.token
        res.cookie("token", token)
        res.json({
            code: 200,
            message: "Đăng kí thành công",
            token: token

        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi. Đăng kí không thành công"
        })

    }
}
module.exports.login = async (req, res) => {
    try {
        const checkEmailExist = await User.findOne({
            email: req.body.email,
        })
        if (!checkEmailExist) {
            res.json({
                code: 400,
                message: "Email không tồn tại"
            })
        }
        else {
            const checkEmailLock = await User.findOne({
                email: req.body.email,
                deleted: false
            })
            if (!checkEmailLock) {
                res.json({
                    code: 400,
                    message: "Tài khoản đã bị khóa"
                })
            }
            else {
                const checkUser = await User.findOne({
                    email: req.body.email,
                    deleted: false,
                    password: req.body.password
                })
                if (!checkUser) {
                    res.json({
                        code: 400,
                        message: "Lỗi. Mật khẩu sai"
                    })
                }
                else {
                    res.json({
                        code: 200,
                        message: "Đăng nhập thành côbng"
                    })
                }
            }
        }

    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        })
    }
}
module.exports.forgotPassword = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        deleted: false
    })
    if (!user) {
        res.json({
            code: 200,
            message: "Email không tồn tại"
        })
    }
    const otp = generate.generateRandomNumber(6)

    //Luuw data vào database
    const objectForgotPassword = {
        email:req.body.email,
        otp : otp,
        expireAt: Date.now() 
    }
    const forgotPassword  = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()

    //Gửi mã OTP
    const subject = `Mã OTP xác minh lấy lại mật khẩu`
    const html=`
        Mã OTP xác minh lấy lại mật khẩu là <b> ${objectForgotPassword.otp} </b>. Lưu ý không để lộ mã OTP. Thời hạn sử dụng mã là 3 phút
    `
    sendMailHelper.sendMail(req.body.email, subject,html);

    res.json({
        code:200
    })
}
module.exports.otpPassword = async(req,res)=>{
    const email = req.body.email
    const otp = req.body.otp
    const userOtp = await ForgotPassword.findOne({
        otp: otp,
        email: email
    })
    if(!userOtp){
        res.json({
            code:400,
            message:"Mã otp không hợp lệ"
        })
        return;
    }
    const user = await User.findOne({
        email: email
    })
    const token = user.token
    res.cookie("token", token)
    res.json({
        code:200,
        meesage:"Xác thực thành công",
        token: token

    })
}
module.exports.resetPassword = async(req,res)=>{
    const token  = req.body.token
    const password = req.body.password
    const user = await User.findOne({
        token: token
    })
    if(password === user.password){
        res.json({
            code:400,
            message:"Nhập mật khẩu khác với mật khẩu cũ"
        })
    }
    await User.updateOne({
        token: token
    },{
        password: password
    })
    res.json({
        code:200,
        message:"đỏi mật khảu thành công"
    })
}
