const mongoose = require('mongoose');

const apiResponseSchema =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    apiId:{type:mongoose.Schema.Types.ObjectId,ref:'ApiDtl'},
    responseCode:{type:Number},
    responseDesc:{type:String},
    timestamp:{type:String}
})

module.export = mongoose.model('Responsereport',apiResponseSchema); 