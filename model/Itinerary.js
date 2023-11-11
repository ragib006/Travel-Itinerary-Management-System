const mongoose = require('mongoose')
const User = require('./User.js')

const ItinerarySchema = mongoose.Schema({

    name:{

    	type:String,
    	required:true
    },

    date:{

       type:String,
       required:true

    },

 
    destination:{

    	type:String,
    	required:true
    },

    activities:{

        type:String,
        required:true
    },


    transportationdetails:{

        type:String,
        required:true
    },


  accommodationdetails:{

        type:String,
        required:true
    },

  userid:{

         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
        // required:true
    },




},{timestamps:true})


    const Itinerary = mongoose.model("Itinerary",ItinerarySchema)

    module.exports = Itinerary