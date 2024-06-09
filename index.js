
const dotenv = require("dotenv")
dotenv.config()
const express=require("express")
const app=express()
const connectDB = require("./config/db")

connectDB().then(()=>{
    console.log("connected to db");
});








const port = process.env.PORT || 4000;
app.listen(port,()=>console.log(`listening on port ${port}`))