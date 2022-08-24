const express= require('express')
const app=express();
const auth = require('./routes/auth');
const products=require('./routes/products')
const errorsMiddleware=require('./middlewares/errors')
app.use(express.json())
app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use(errorsMiddleware)
module.exports=app;

