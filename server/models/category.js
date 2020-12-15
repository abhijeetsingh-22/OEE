const mongoose= require('mongoose')
const { User } = require('./user')


const categorySchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    iconUrl: String,
    user:{type: mongoose.Types.ObjectId,ref:User}
},{timestamps:true})


const Category= mongoose.model('category',categorySchema)
module.exports=Category