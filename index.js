
const dotenv = require("dotenv")
dotenv.config()
const express=require("express")
const app=express()
const connectDB = require("./config/db")
app.use(express.json());
const userRoutes=require("./routes/userRoutes")
const feedbackRoutes=require("./routes/feedbackRoutes")
const offerRoutes=require("./routes/offerRoutes")
const requestRoutes=require("./routes/requestRoutes")

connectDB().then(()=>{
    console.log("connected to db");
});

app.use('/api/users', userRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/request',offerRoutes)
app.use('/api/request',requestRoutes)
const port = process.env.PORT || 4000;
app.listen(port,()=>console.log(`listening on port ${port}`))