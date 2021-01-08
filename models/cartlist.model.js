var mongoose=require('mongoose');
var Cart=require('../models/cart.model');
var cartSchema= new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId, ref:'Customer'},
    cart:{type:Object, required:true},
    qty:{type:Number},
    totalprice:{type:Number},
    email:{type:mongoose.Schema.Types.String, ref:'Customer'},
    date: {type:String}
    });
  

module.exports = mongoose.model('Cartlist', cartSchema);