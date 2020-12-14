const mongoose= require('mongoose')


const categorySchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    iconUrl: String,
    user: mongoose.Types.ObjectId
},{timestamps:true})


const Category= mongoose.model('category',categorySchema)
module.exports=Category