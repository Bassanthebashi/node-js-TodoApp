require('dotenv').config();
const express=require('express');
require('./helpers/db');
const bodyParser= require('body-parser')
require('express-async-errors');
const { errorHandler } =require('./middlewares/errorHandler')
const app=express();
const http = require('http');
const cors=require('cors');
app.use(cors());
const userRoutes=require('./routes/userRoutes');
const todoRoutes=require('./routes/todoRoutes');
const groupRoutes=require('./routes/groupRoutes');
const hostname = '127.0.0.1';
const port = 3000;


app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user',userRoutes)
app.use('/todo',todoRoutes)
app.use('/group',groupRoutes)
app.use(errorHandler);




app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});