const jwt = require('jsonwebtoken')
const user = require('../models/user')

isLoggedin= function(req,res,next){
    try{
        const token=req.headers.authorization.split(' ')[1]
        jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
            if(decoded){
                return next()
            }
            else 
            return next({status:401,message:'you need to login to do that'})
        })
    }catch(err){
        return next({status:401,message:'you need to login to do that'})
    }
}

isCorrectUser= function(req,res,next){
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
            if(decoded && decoded.id==req.params.id)
                return next()
            else return next({status:401,message:'Unauthorized'})
        })
    }catch(err){
        return next({status:401,message:'Unauthorized'})
    }
}

 function setAuthUser(req,res,next){
    try{
        console.log("checking user login status ❤🤦‍♂️");
        if(req.headers.authorization){
            const token=req.headers.authorization.split(' ')[1]
          var decoded=   jwt.verify(token, process.env.TOKEN_SECRET)
          if(decoded){
              req.user=decoded
              return next()
          }
       
    }
    return next({status:400,message:'you need to login to do that'})

    }catch(err){
        return next({status:401,message:'you need to login to do that'})
    }
}

module.exports= {isLoggedin,isCorrectUser,setAuthUser}