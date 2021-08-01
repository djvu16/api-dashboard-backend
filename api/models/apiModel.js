const mongoose = require('mongoose');

const apiSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    apiName:{type:String,required:true},
    apiCName:{type:String,required:true},
    backendIP:{type:String,required:true},
    port:String,
    backendEndPoint:{type:String,required:true},
    urlReWritingWith:String,
    fullBackendUrl:String,
    gatewayUrl:String,
    consumer:{type:String,required:true},
    producer:String,
    state:String,
    description:String,
    clientId:{type:String,required:true},
    clientSecret:String,
    isActive:String,
    registeredBy:{type:String,required:true}
});

module.exports = mongoose.model('Apidtl',apiSchema);