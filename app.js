const express = require('express');
require('dotenv').config();

const app = express();
const userRouter = require('./users/user_routers');

app.use(express.json());

app.use('/', userRouter);


app.listen(process.env.APP_PORT,()=>{
    console.log("server up and started");
});