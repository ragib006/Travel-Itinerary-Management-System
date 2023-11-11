
const jwt = require('jsonwebtoken');
const User = require('../model/User.js')
const asyncHandler = require('express-async-handler')




const  protect = asyncHandler( async(req,res,next)=>{

//  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

    try{

       let token

       token = req.headers.authorization.split(' ')[1]

       const decoded = jwt.verify(token,process.env.JWT_SECRET)

       req.myId = await User.findById(decoded.id)

    //   console.log(decoded)

       next()



    }catch(error){


      res.status(401).json({message:'Not Found Aay Token'})


    }



  }else{

         

            res.status(401).json({message:'Not Found Any Token'})

  }




})





module.exports = {protect}

