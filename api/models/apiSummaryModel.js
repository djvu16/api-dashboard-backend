const mongoose = require('mongoose');

const apiSummarySchema =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    apiId:{type:mongoose.Schema.Types.ObjectId,ref:'ApiDtl'},
    timestamp:{type:String},
    total_tr:{type:Number},
    success_tr:{type:Number},
    failed_tr:{type:Number}
})

module.export = mongoose.model('Hitreport',apiSummarySchema); 