const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
const { findById } = require('../models/photo.model');
var emp=new Image();
var Cart=require('../models/cart.model');
var Cartlist=require('../models/cartlist.model');
const Cartlist1=mongoose.model('Cartlist');



router.get('/:_id',function(req,res,next){
    var pid=req.params._id;
     var cart=new Cart(req.session.cart ? req.session.cart: {} );
    Image.findById(pid,function(err,product){
         if(err)
         {
             //return res.redirect('/');
             console.log('no cart');
             
         } else
         {      
        cart.add(product,product._id);
         req.session.cart=cart;
         console.log(req.session.cart);
        
         //res.redirect('/base');
        
        var cartlist=new Cartlist({
            id:req.user,
            cart:req.session.cart,
            date: new Date()  

        }); 
        Cartlist1.find(function(err,docs){
            if(docs) 
            {  
                var car=req.session.cart;
                //console.log(docs);
                var pro1=Object.values(car);
                var p1=Object.entries(pro1);
                var pq1=Object.values(p1[0]);
                var s1=Object.values(pq1);
                var t1=s1[1];
                var g1=Object.values(t1);
                var h1=g1[0];
                var o1=h1.item._id;
                    console.log(o1); 
                    var k=[];
                docs.forEach(function(wi)
                {
                    var pro=Object.values(wi.cart.items);
                    var p=Object.entries(pro);
                    var pq=Object.values(p[0]);
                    var pp=pq[1];
                    var pr=pp.item._id;
                    console.log(pr);
                    var mn;
                    mn=pr.equals(o1); 
                    k.push(mn);
                    console.log(k);
                 
                        /*
                        console.log("new wish");
                        wishlist.save(function(err,result){
                            if(err){
                                console.log(err);
                            }
                            else {
                            console.log('saved');
                            req.flash('success','saved');
                            req.session.wish=null;
                            res.redirect('/base');
                            
                        }
                        }); */
                    
                    
                }) 
                    
                function found(arr, obj) {
                    for (var i = 0; i < arr.length; i++) {
                      if (arr[i] == obj) return true;
                    }
                  }
                   if(found(k,true)==true)
                   {
                    console.log("already added");
                    req.flash('error','Already added to cart');
                    req.session.cart=null;
                    res.redirect('/base');
                   }
                   
                   else
                   {    
                    console.log("new cart"); 
                    cartlist.save(function(err,result){
                     if(err){
                         console.log(err);
                     }
                     else {
                     console.log('saved');
                     req.flash('success','Added to cart');
                     req.session.cart=null;
                     res.redirect('/base');
                 }
                 }); 
             } 
                    
                //console.log("already added"); */
            }  
           
            else
            
            {    
                   console.log("new user"); 
                cartlist.save(function(err,result){
                    if(err){
                        console.log(err);
                    }
                    else {
                    console.log('saved');
                    req.flash('success','Added to cart');
                    req.session.cart=null;
                    res.redirect('/base');
                }
                }); 
            } 
         }); /*
        cartlist.save(function(err,result){
            if(err){
                console.log(err);
            }
            else {
            console.log('saved');
            req.flash('success','saved');
            req.session.cart=null;
            res.redirect('/base');
        }
        }); */
   
    }
     }); 
     
     //console.log(pid);
 });


module.exports=router;