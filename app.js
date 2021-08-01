require('dotenv').config();
const express= require('express');
/* const bodyParser=require('body-parser'); */
const mongoose=require('mongoose');
const morgan= require('morgan');
const cors=require('cors');
const session = require("express-session");



const apiDataRoutes = require('./api/routes/apiDataRoutes');
const userRoutes= require('./api/routes/userRoutes');

//start server
const app=express();

/* this is used to parsing x-www-form-urlencoded type data
 app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); */
app.use(express.json());

//***************handle cors */
app.use(cors());
/* app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method==="OPTIONS"){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next(); 
});*/


//static files
app.use(express.static("public"));


//location of the session block must be after app use and above the mongoose connection
/* app.use(session({
    secret:'our little secret',
    resave:false,
    saveUninitialized:true,
    //cookie:{secure:true}
})); */



const uri="mongodb://"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_NAME;
    mongoose.set('useUnifiedTopology',true);
    mongoose.set('useCreateIndex',true);

    mongoose.connect(uri,{'useNewUrlParser':true});

app.use(morgan('dev'));



//Routes which should handle requests
app.use('/api',apiDataRoutes);
app.use('/user',userRoutes);

//handle errors
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
});


//listen on port 3001
app.listen(3001,()=>(console.log('listening on port 3001')));