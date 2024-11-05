const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const {mongoClient, MongoClient}=require('mongodb')

dotenv.config()
const app =express();
app.use(cors(
    origin='http://localhost:3000/'
))

const port = process.env.PORT || 4001
const mongo_uri = process.env.MONGO_URI
 const client = new MongoClient(mongo_uri)
//  use topology here if not work
 

mongoose.connect(mongo_uri).then(()=>console.log("mongo connected")
)

.catch((err)=>console.log(`error ${err}`)
)
app.use(bodyParser,bodyParser.json())

const userRoute = require('./routes/userRoutes')

app.use('api/users',userRoute)
app.get('/',(req, res)=>{
    res.send('server running')
})

app.listen(port, (err)=>{
    if (err) {
        console.error('error starting the server');
        
        
    }else{
        console.log(`server running at port ${port}`);
        
    }
})