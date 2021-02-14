const mongoose= require('mongoose')
const {User}= require('./user')

const postSchema= new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    user: {type: mongoose.Types.ObjectId,ref:'user'},
    thread:{type: mongoose.Schema.ObjectId, ref:'thread'}
},{timestamps:true})

postSchema.pre('save',async function(next){
    try{
        let user= await User.findOneAndUpdate({id:this.user},{$push:{posts:this.id}})
        let thread= await User.findOneAndUpdate({id:this.thread},{$push:{posts:this.id}})
        next()
    }catch(err){
    console.error('error occured') 
    next({status:400,message:'Oops !! Something went wrong.'})
    }
})

const Post= mongoose.model('post',postSchema)
module.exports=Post