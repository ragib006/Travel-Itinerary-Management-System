const express = require("express");

const router = express.Router();

const {protect} = require('../middleware/authMiddleware.js')

const {Createuser,Loginuser,CreateItinerary,Updateitinerary,DeleteItinerary,ViewSpecficItinerary,ListofItineraryUser} =  require('../controller/UserController.js')





//createuser   
//localhost:5000/api/createuser

//Raw jaon data for createuser

//{

  // "name":"Ragib Hasan",
  // "email":"ragibhasan006@gmail.com",
  // "password":"0177"

//}


router.post('/createuser',Createuser)



//login user
//localhost:5000/api/loginuser

//Raw jaon data for loginuser

//{

// "email":"ragibhasan006@gmail.com",
//"password":"01773672495"

//}
router.post('/loginuser',Loginuser)



//createuser   
//localhost:5000/api/createitinerary

//{
// "name":"Akash Ahmed",
// "date":"20-09-2023",
// "destination":"Teacher",
 //"activities":"all",
// "transportationdetails":"alltime car",
// "accommodationdetails":"hdsgvcsdhvc",
// "userid":"654f1a371877f84b566552bc"                      

 //}

router.post('/createitinerary',protect,CreateItinerary)




//update hotel
//localhost:5000/api/updateitinerary/:id


router.put('/updateitinerary/:id',protect,Updateitinerary)


//DeleteItinerary
//localhost:5000/api/deleteitinerary/:id

router.delete('/deleteitinerary/:id',protect,DeleteItinerary)

//ViewSpecficItinerary

//DeleteItinerary
//localhost:5000/api/specficItinerary/:id

router.get('/specficItinerary/:id',protect,ViewSpecficItinerary)




//ListofItineraryUser
//localhost:5000/api/listofitineraryuser

router.get('/listofitineraryuser',protect,ListofItineraryUser)











module.exports = router