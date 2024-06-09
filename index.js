const { PORT } = require("./constant")
const express=require("express")
const app=express()








const port=PORT??4000;
app.listen(port,()=>console.log(`listening on port ${port}`))