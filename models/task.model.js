const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema(
    {
        title: String,
        status: String,
        content: String,
        createdBy: String,
        listUser:Array,
        taskParentId: String,
        timeStart: Date,
        timeFinish: Date,
        deleted: {type:Boolean, default:false},
    },
    {
        timestamps: true
    }
)

const Task = mongoose.model('Task',taskSchema,"tasks")
module.exports = Task