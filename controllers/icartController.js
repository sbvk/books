const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
const { findById } = require('../models/photo.model');
var emp=new Image();
var Cart=require('../models/cart.model');
router.get('/', function(req,res,next){

    //res.render('shop/shopcart');
    if(!req.session.cart){
        console.log('noo');
        return res.render('shop/shopcart', {products:null});
    } else 
    {
        var cart=new Cart(req.session.cart);
        res.render('shop/shopcart', {products:cart.generateArray(), totalPrice:cart.totalPrice,totalQty:cart.totalQty});
        console.log('yess');
    }
    //

});

router.post('/checkout', function(req,res,next){
    if(!req.session.cart){
        console.log('noo');
    } else
    {
        var cart=new Cart(req.session.cart);
        var order=new Order({
            id:req.user,
            cart:cart,
            email:req.user.email,
            firstname:req.user.firstname,
            date: new Date()

        });
        order.save(function(err,result){
            if(err){
                console.log(err);
            }
            else {
            console.log('ordered');
            req.flash('success','bought');
            req.session.cart=null;
            res.redirect('/');
        }
        });
    }

});

router.post('/reduce/:_id',function(req,res,next){
    var pid=req.params._id;
     var cart=new Cart(req.session.cart ? req.session.cart: {} );
    cart.reducebyOne(pid);
    req.session.cart=cart;
    res.redirect('/icart');
 });
 router.post('/remove/:_id',function(req,res,next){
    var pid=req.params._id;
     var cart=new Cart(req.session.cart ? req.session.cart: {} );
    cart.removeAll(pid);
    req.session.cart=cart;
    res.redirect('/icart');
 });


module.exports=router;