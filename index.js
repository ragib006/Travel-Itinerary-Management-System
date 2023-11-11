const express = require('express');
const app = express();
const dotenv  = require('dotenv');
const connectDB = require('./config/db.js')

const UserRoute = require("./routes/UserRoute")



const bodyParser = require('body-parser')


dotenv.config()

connectDB();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))



    app.use('/api',UserRoute)


 


  const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server Running On Port ${process.env.PORT}`))