const express= require('express')
const app=express();
const auth = require('./routes/auth');
const products=require('./routes/products')
const orders = require('./routes/orders')
const errorsMiddleware=require('./middlewares/errors');
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser())
app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1', orders)
app.use(errorsMiddleware)
module.exports=app;

