
const asyncHandler = require('express-async-handler')


const User = require('../model/User.js')

const Itinerary = require('../model/Itinerary.js')



const bcrypt = require('bcryptjs');

const generateToken = require("../config/generateToken")



//create user   
//localhost:5000/api/createuser

//Raw jaon data for createuser

//{

  // "name":"Ragib Hasan",
  // "email":"ragibhasan006@gmail.com",
  // "password":"01773672495"



//}


const Createuser = asyncHandler(async(req,res)=>{
          
      try{

            const userExists = await User.findOne({email:req.body.email})

            if(userExists){
             
              res.status(400).json({message:'User Already Exist'})

            }else{

                                
                      const salt = bcrypt.genSaltSync(10);
                      const hash = bcrypt.hashSync(req.body.password, salt);

                      const newUser = new User({

                        name:req.body.name,
                        email:req.body.email,
                        password:hash


                        })

                       const user = await newUser.save();

                     
                      if(user){

                             res.json({

                             _id:user._id,
                             name:user.name,
                             email:user.email,
                     
                             token:generateToken(user._id)


                             })

                         }else{

               
                           res.status(404).json('User Not create')


                             }

                    }



      }catch(error){

         res.status(404).json(error)

      }




})







//login user   
//localhost:5000/api/loginuser


//Raw jaon data for loginuser

//{

  // "name":"Ragib Hasan",
  // "email":"ragibhasan006@gmail.com",




//}

const Loginuser = asyncHandler(async(req,res)=>{
          

      try{


            const Findemail = await User.findOne({email:req.body.email})

            if(!Findemail){

                  res.status(404).json('User Does Not Exist')
            }else{

              //comparepassword   
              const comparepassword = await bcrypt.compare(req.body.password, Findemail.password)
       
                     if(comparepassword){


                       res.json({

                               _id:Findemail._id,
                               name:Findemail.name,
                               email:Findemail.email,
                            
                               token:generateToken(Findemail._id)

                      })

                     
                       }else{

                           res.status(404).json('Invalid Email or Password')
                      }

            }

      }catch(error){

         res.status(404).json(error)

      }

})







const CreateItinerary = asyncHandler(async(req,res)=>{
          
      try{


            const itinerarydata = new Itinerary({

                        name:req.body.name,
                        date:req.body.date,
                        destination:req.body.destination,
                        activities:req.body.activities,
                        transportationdetails:req.body.transportationdetails,
                        accommodationdetails:req.body.accommodationdetails,
                        userid:req.body.userid
                      


             })


               const saveitinerary = await itinerarydata.save();


                res.status(200).json(saveitinerary);

                     
              


      }catch(error){

         res.status(404).json(error)

      }




})




//update hotel
//localhost:5000/api/updateitinerary/:id

const Updateitinerary = asyncHandler(async(req,res)=>{

  const  Id = req.params.id;
  const updateData = req.body;


      try{

           const updatedCategory = await Itinerary.findByIdAndUpdate(Id, updateData, { new: true });


        //  const update = await Itinerary.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true});

          res.status(200).json(updatedCategory)


         res.json(req.params.id)

      }catch(error){

         res.status(404).json(error)

      }
          

   

})





//DELETEitinerary

//localhost:5000/api/deleteitinerary/:id




const DeleteItinerary = asyncHandler(async(req,res)=>{
          

      try{

       await Itinerary.findByIdAndDelete(req.params.id);

          res.status(200).json('Itinerary Delete SuccessFully')


      }catch(error){

         res.status(404).json(error)

      }

})







const ViewSpecficItinerary = asyncHandler(async(req,res)=>{
          

      try{

       const singleItinerary = await Itinerary.findById(req.params.id).populate('userid');

          res.status(200).json(singleItinerary);


      }catch(error){

         res.status(404).json(error)

      }

})





const ListofItineraryUser = asyncHandler(async(req,res)=>{
          

      try{

       const Itineraryuser = await Itinerary.find().populate('userid');

          res.status(200).json(Itineraryuser);


      }catch(error){

         res.status(404).json(error)

      }

})











module.exports = {Createuser,Loginuser,CreateItinerary,Updateitinerary,DeleteItinerary,ViewSpecficItinerary,ListofItineraryUser}


