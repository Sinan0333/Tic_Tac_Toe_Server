const mongoose =  require('mongoose')
const dotenv =require('dotenv')
dotenv.config()

module.exports={
    mongoDB:()=>{
       mongoose.connect(process.env.MONGO_URL,{
       }).then(()=>{
        console.log("Database connected");
       }).catch((err)=>{
        console.log(err);
       })
    }
 
 }