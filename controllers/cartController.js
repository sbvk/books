const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
const { findById } = require('../models/photo.model');
var emp=new Image();
var Cart=require('../models/cart.model');

router.get('/:_id',function(req,res,next){
   var pid=req.params._id;
    var cart=new Cart(req.session.cart ? req.session.cart: {} );
   Image.findById(pid,function(err,product){
        if(err)
        {
            //return res.redirect('/');
            console.log('no');
            
        }
        cart.add(product,product._id);
        req.session.cart=cart;
        console.log(req.session.cart);
        res.redirect('/base');
    }); 
    
    //console.log(pid);
});



module.exports=router;