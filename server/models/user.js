const mongoose=require('mongoose')
const bcrypt =require('bcrypt')


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}
,{discriminatorKey:'role'})

userSchema.pre('save',async function(next){
    try{
        if(!this.isModified('password'))
            return next()
        let hashedPassword= await bcrypt.hash(this.password,10)
        this.password=hashedPassword
        return next()
    }catch(err){
        return next(err)
    }
})
userSchema.methods.comparePassword=async function(candidatePassword,next){
    try{
        let isMatch =await bcrypt.compare(candidatePassword,this.password)
        console.log("checking for password 💕",isMatch);
        return isMatch
    }catch(err){
        console.log('found err ✌✌',err);
        return next(err)
    }
}

const User= mongoose.model('User',userSchema);
const studentSchema=new mongoose.Schema({
    year:String,
    eno:String
})
const staffSchema= new mongoose.Schema({
    empid:String,
})
const Student =User.discriminator('student',studentSchema)
const Staff=User.discriminator('staff',staffSchema)





module.exports={User, Student ,Staff};

