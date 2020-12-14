const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI,{ keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true,},
    ()=>console.log('Database Connected'))




module.exports=require('./user')
module.exports.Category= require('./category')