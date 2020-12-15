const mongoose= require('mongoose')
const { User } = require('./user')


const threadSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    user:{type: mongoose.Types.ObjectId,ref:User},
    category:{type: mongoose.Schema.ObjectId, ref:'category'}
},{timestamps:true})


const Thread= mongoose.model('thread',threadSchema)
module.exports=Thread