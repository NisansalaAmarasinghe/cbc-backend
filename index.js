import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";

const app = express();

const mongoUrl = "url"

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database Connected");
})

//middlewares
app.use(bodyParser.json())
app.use(
    (req,res,next)=>{
        
        const token = req.header("Authorization")?.replace("Bearer ","")
        console.log(token)

        if(token != null){
            //descrypt
            jwt.verify(token,"cbc-secret-key-7973",(error,decoded)=>{
                if(!error){
                    console.log(decoded)
                    req.user = decoded
                }
            })
        }
        next()
    }
)

app.use("/api/products",productRouter)
app.use("/api/users",userRouter)

app.listen(
    5000,
    ()=>{
        console.log("Server is running on port 5000");
    }
)

