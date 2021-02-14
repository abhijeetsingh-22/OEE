const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signUp = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let {id, email, role, name} = user;
    let token = jwt.sign({id, email, role, name}, process.env.TOKEN_SECRET);
    return res.status(200).json({token, id, email, role, name});
  } catch (err) {
    if (err.code == 11000) {
      err.message = 'Sorry, email is already registered ';
    }
    return next({status: 400, message: err.message});
  }
};
exports.signIn = async function (req, res, next) {
  try {
    let user = await db.User.findOne({email: req.body.email});
    let {id, name, email, role} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign({id, name, email, role}, process.env.TOKEN_SECRET);
      return res.status(200).json({id, name, email, role, token});
    } else {
      return next({status: 400, message: 'Invalid Email/Password.'});
    }
  } catch (err) {
    return next({status: 400, message: 'Invalid Email/Password'});
  }
};
