//require('dotenv').config({path: "./env" })

import dotenv from "dotenv"
import connectDB from "./db/index.js";
dotenv.config({path:"./env"})


connectDB();


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



