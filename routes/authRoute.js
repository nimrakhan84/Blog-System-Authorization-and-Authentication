const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res, next) => {
   
    const {email, password} = req.body;
    try {
      const user = await User.findOne({email});
      if (!user){
        return next({ status: 404, message:"User/Password incorrect!"})
      }
      const dbPwd = user.password;
      const isSamePassword = await bcryptjs.compare(password, dbPwd);
      if(isSamePassword){
        const JasonPayload = {name: user.name, id: user.id,  email: user.email};
        const token = jwt.sign(JasonPayload,"RaNdOm@SuP3R@HarD@StRiNg",{expiresIn:"5d"});
        res.json({message: "Login Success", token});
      }
      else{
        next({status: 404, message: "User/password is incorrect"});
      }

      
    } catch (error) {
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
  });


  router.post('/register', async (req, res, next) => {
    const {name, email, password} = req.body;
    const encPassword = bcryptjs.hashSync(password, 15);
    try {
       const newUser = await User.create({name, email, password: encPassword});
       res.json({user: newUser});
    } catch (error) {
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
  });
  

  module.exports = router;
