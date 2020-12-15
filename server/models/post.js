const mongoose= require('mongoose')


const postSchema= new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    user: {type: mongoose.Types.ObjectId,ref:'user'},
    thread:{type: mongoose.Schema.ObjectId, ref:'thread'}
},{timestamps:true})


const Post= mongoose.model('post',postSchema)
module.exports=Post