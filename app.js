const express = require('express');
const cors= require('cors')
const dotenv = require('dotenv')

const userRoute = require('./route/userRoute')

dotenv.config()
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST","PUT","DELETE","PATCH"],
      credentials: true,
    })
);

app.use('/api',userRoute)

module.exports = app