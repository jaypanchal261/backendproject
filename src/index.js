//require('dotenv').config({path: "./env" })

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({path:"./env"})


connectDB()
.then(()=>{

    app.on("error",(error)=>{
        console.log("Error!",error)
        throw error 
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`)
    })
})
.catch((err)=>{
   console.log("MongoDB connection failed!",err)
})


// import express from "express";
// const app = express();


// ( async ()=>{
//      try {
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
//         app.on("error",(error)=>{
//             console.log("ERR:",error);
//             throw error
//         })
        
//         app.listen(`${process.env.PORT}`,()=>{
//             console.log(`App is listening to ${process.env.PORT} `)
//         })
//      } catch (error) {
//         console.error("ERROR:",error);
//         throw error;
        
//      }
// })();



