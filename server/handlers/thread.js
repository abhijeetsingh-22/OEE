const db= require('../models')


const createThread= async (req,res,next)=>{
    try{
        const {title,body,category}=req.body
        let thread=(await db.Thread.create({title,body,user:req.user.id,category}))
        thread= await thread.populate('user','name email').execPopulate()
        await db.User.findByIdAndUpdate(req.user.id,{$push:{threads:thread._id}})
        return res.status(200).json(thread)
    }catch(err){
    console.error('error occured') 
    next({status:400,message:'Oops !! Something went wrong.'})
    }
}

const getThread= async(req,res,next)=>{
    try{
        let foundThread = await db.Thread.findById(req.params.threadId).populate('user','name email')
        return res.status(200).json(foundThread)
    }catch(err){
    console.error('error occured') 
    next({status:400,message:'Oops !! Something went wrong.'})
    }
}

const getAllThreads= async(req,res,next)=>{
    try{
        let foundThreads=await db.Thread.find().populate('user', 'name email').populate('category','title')
        return res.status(200).json(foundThreads)
    }catch(err){
    console.error('error occured') 
    next({status:400,message:'Oops !! Something went wrong.'})
    }
}
const getAllThreadsByCategory= async(req,res,next)=>{
    try{
        let foundThreads= await db.Thread.find({category:req.params.categoryId}).populate('user', 'name email')
        return res.status(200).json(foundThreads)
    }catch(err){
    console.error('error occured') 
    next({status:400,message:'Oops !! Something went wrong.'})
    }
}

module.exports={createThread,getThread,getAllThreads,getAllThreadsByCategory}