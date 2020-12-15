const db= require('../models')

const createCategory= async(req,res,next)=>{
    try{
        const {title,iconUrl, }=req.body
        const category= await db.Category.create({title,iconUrl,user:req.user.id})
        const foundCategory= await db.Category.findById(category.id)
        .populate('user',{email:true,name:true}).exec()
        console.log('happy to be here 🤦‍♂️🤦‍♂️',foundCategory, req.user);
        return res.status(200).json(foundCategory)
    }catch(err){
        return next(err)
    }
}

const getAllCategories=  async (req,res,next)=>{
    try{
        let foundCategories= await db.Category.find().populate('user',{name:true,email:true})
        return res.status(200).json(foundCategories)

    }catch(err){
        console.error("error 🚫👨‍🚫 ", err);    
        next({status:400, message: "Oops!! Something went wrong"})
    }
}

const getCategory= async (req,res,next)=>{
    try{
        let foundCategory= await db.Category.findById(req.params.id).populate('user',{name:true,email:true})
        return res.status(200).json(foundCategory)
    }catch(err){
    console.error('error occured') 
    next({status:400,message:'Oops !! Something went wrong.'})
    }
}


module.exports={createCategory,getAllCategories,getCategory}