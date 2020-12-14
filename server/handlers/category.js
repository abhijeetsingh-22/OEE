const db= require('../models')

const createCategory= async(req,res,next)=>{
    try{
        const {title,iconUrl, }=req.body
        const category= await db.Category.create({title,iconUrl,user:req.user.id})
        const foundCategory= await db.Category.findById(category.id)
        .populate('user',{name:true,email:true})
        console.log('happy to be here 🤦‍♂️🤦‍♂️',foundCategory);
        return res.status(200).json(foundCategory)
    }catch(err){
        return next(err)
    }
}


module.exports={createCategory}