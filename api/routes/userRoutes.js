const express = require ('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt= require ("bcrypt");
const jwt = require ('jsonwebtoken');

const User = require('../models/userModel');

router.post('/signup',function(req,res,next){
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message:'User already registered'
            });
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }
                else {
                    const user = new User({
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        return res.status(200).json({
                            message:'User Created'
                        });
                    })
                    .catch(error => {
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    })
                }
           });
        }
    })  
 });

router.delete('/delete/:userId',(req,res,next)=>{
    User.deleteOne({_id:req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message:'User Deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});

router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(401).json({
                message:'Authentication Failed'
            });
        }
        else{
            bcrypt.compare(req.body.password,user[0].password,(error,result)=>{
                if(error){
                    return res.status(401).json({
                        message:'Authentication Failed'
                    });
                }
                if(result){
                    const token=jwt.sign({
                        email:user[0].email,
                        userId:user[0]._id
                    },
                    process.env.JWT_SECRET_PW,
                    {
                        expiresIn:"1h"
                    });
                    return res.status(200).json({
                        message:"Authentication Successful",
                        token:token,
                        isAuthenticated:true,
                        email:user[0].email
                    });
                }
                res.status(401).json({
                    message:'Authentication Failed'
                });
            });
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});


module.exports = router;