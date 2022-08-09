const express = require('express');
const cors = require('cors');


const app = express()

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


// middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions));

// routers
const router = require('./routes/productRouter.js')
app.use('/api/v1/user', router)



//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})