const express = require('express');
const router= express.Router();
const mongoose=require('mongoose');
const checkAuth = require('../middleware/check-auth');

const ApiDtl=require ('../models/apiModel');

router.get('/',checkAuth,(req,res,next)=>{
    ApiDtl.find()
    .select('_id apiName apiCName backendIP port backendEndPoint urlReWritingWith fullBackendUrl gatewayUrl consumer producer state description clientId clientSecret isActive registeredBy')
    .exec()
    .then(docs => {
        const response = {
            count:docs.length,
            apiDtls: docs
        }
        if(docs.length >= 0)
            res.status(200).json(response);
        else{
            res.status(404).json({
                message:'No entries found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
                error:err
            })
        });
});
router.post('/',checkAuth,(req,res,next)=>{
    
    const apiDtl=new ApiDtl({
        _id:new mongoose.Types.ObjectId(),
        apiName:req.body.apiName,
        apiCName:req.body.apiCName,
        backendIP:req.body.backendIP,
        port:req.body.port,
        backendEndPoint:req.body.   backendEndPoint,
        urlReWritingWith:req.body.  urlReWritingWith,
        fullBackendUrl:req.body.fullBackendUrl,
        gatewayUrl:req.body.gatewayUrl,
        consumer:req.body.consumer,
        producer:req.body.producer,
        state:req.body.state,
        description:req.body.description,
        clientId:req.body.clientId,
        clientSecret:req.body.clientSecret,
        isActive:req.body.isActive,
        registeredBy:req.body.registeredBy
    });
    apiDtl.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message:'Data successfully saved',
            createdApi:result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            err:err
        });
    });
});

router.get('/:apiId',checkAuth,(req,res,next)=>{
    const id=req.params.apiId;
    ApiDtl.findById(id)
    .exec()
    .then(doc => {
        console.log("from db ",doc);
        if(doc)
            res.status(200).json(doc);
        else{
            res.status(404).json({
                message:"No valid entry found for provided ID"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            err:err
        });
    });
});
router.patch('/:apiId',checkAuth,(req,res,next)=>{
        const id=req.params.apiId;
        const updateOps ={};
        console.log(req.body);
        for(const ops of req.body){
            updateOps[ops.propName]=ops.value;
        }
        console.log(updateOps);
        ApiDtl.update({_id:id},{$set:updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
    });
router.delete('/:apiId',checkAuth,(req,res,next)=>{
        const id= req.params.apiId;
        ApiDtl.remove({_id:id})
        .exec()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
    });

module.exports = router ;