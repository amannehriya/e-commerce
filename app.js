const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config();
const connectDB = require("./config/mongoose-connection");
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require('./routes/productRouter')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

 

app.use('/',indexRouter);
app.use('/user',userRouter);
app.use('/product',productRouter);
app.listen(3000);
