const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
var Cartlist1=mongoose.model('Cartlist');
var { findById } = require('../models/cartlist.model');
var emp=new Image();
var Cart=require('../models/cart.model');
var Cartlist=require('../models/cartlist.model');
var cartlistModel = require('../models/cartlist.model');

router.get('/', function(req,res,next){
    var mysort = { date: -1 };
     
    Cartlist.find({id:req.user},function(err,orders){
        if(err){
            console.log(err);
        }
        var cart;//console.log(orders);
        orders.forEach(function(order){
            cart=new Cart(order.cart);
           order.items=cart.generateArray();
            
        });
        var ct;
        Cartlist.countDocuments({id:req.user},function(err,ct){
            if(err){
                console.log(err);
            }
            console.log(ct);
       
        res.render('mycart/mycart',{orders:orders, ct:ct});
    })
        //res.render('mycart/mycart',{orders:orders});
    }); 

  

});
router.post('/checkout', function(req,res,next){
   
        //var cart=req.session.cart;
       
         var i=0; var qua=0;var tp=0; var multi=0;
        //var qty=req.body.qty;
        //console.log(qty);
        Cartlist1.find(function(err,docs){
          docs.forEach(function(rep){
              var pro=Object.values(rep.cart.items);
              var p=Object.entries(pro);
              var pq=Object.values(p[0]);
              var pp=pq[1];
              var pr=pp.price;
               
              
            if(err)
                console.log(err);
                else{
          /*      
        var order=new Order({
            id:rep.id,
            cart:rep.cart,
            qty:req.body.qty[i],
            totalprice: pr*req.body.qty[i],
            email:req.user.email,
            firstname:req.user.firstname,
            date: new Date()

        }); */
        multi=pr*req.body.qty[i];
        console.log(req.body.qty[i],pr,multi); 
        
        qua=parseInt(qua)+parseInt(req.body.qty[i]); 
        //qua= (qua-0)+(req.body.qty[i]-0);
        tp= parseInt(tp) + parseInt(pr*req.body.qty[i]);
        rep.totalprice=multi;
        rep.qty=req.body.qty[i];
        rep.save(function(err,result){
            if(err){
                console.log(err);
            }
            else {
                console.log("updated qty:",result);
            }
        })
        console.log(tp);
        i++; 
        /*
        order.save(function(err,result){
            if(err){
                console.log(err);
            }
            else {
                
            
            Cartlist1.findOneAndDelete({id:pid}, function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        console.log("Deleted : ", docs); 
                        console.log('ordered');
                        req.flash('success','bought');
                        req.session.cart=null;
                        //res.redirect('/icart1');
                    } //res.redirect('/myord');
                }); //res.redirect('/myord');
           
        }
        });*/
        
         }
        });
      
     res.render('checkout/checkout',{docs:docs, qua:qua, tp:tp});
});

});
router.post('/place', function(req,res,next){
    var pid=req.user._id;var i=0;
    Cartlist1.find({id:pid},function(err,docs){
      docs.forEach(function(rep){
          var pro=Object.values(rep.cart.items);
          var p=Object.entries(pro);
          var pq=Object.values(p[0]);
          var pp=pq[1];
          var pr=pp.price;
          //console.log(req.body.qty[i]);
          
        if(err)
            console.log(err);
            else{
          
    var order=new Order({
        id:rep.id,
        cart:rep.cart,
        qty:rep.qty,
        totalprice: pr*rep.qty,
        email:req.user.email,
        firstname:req.user.firstname,
        date: new Date()

    }); 
    console.log(rep.qty,pr); 
    
    order.save(function(err,result){
        if(err){
            console.log(err);
        }
        else {
            
        
        Cartlist1.findOneAndDelete({id:pid}, function (err, docs) { 
                if (err){ 
                    console.log(err) 
                } 
                else{ 
                    console.log("Deleted : ", docs); 
                    console.log('ordered');
                    req.session.cart=null;
                    //res.redirect('/icart1');
                } //res.redirect('/myord');
            }); //res.redirect('/myord');
            
    }
    });
    
     }
});     
});
req.flash('success','Order placed successfully!');
res.redirect('/myord');
});


router.post('/reduce/:_id',function(req,res,next){
    var pid=req.params._id;
    Cartlist1.findByIdAndDelete(pid, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
           
            req.flash('success','Removed item from cart');
            res.redirect('/icart1');
           
        } 
    }); 
   
    //res.redirect('/icart1');
   
 });

 router.post('/remove',function(req,res,next){
  
   Cartlist1.deleteMany({id:req.user},function(err,docs){
    if(err){
        console.log(err);
    }
    
        else{ 
            console.log("Deleted : ", docs); 
            req.flash('success','Removed all items from cart');
            res.redirect('/icart1');
        } 
    });
   
    
}); 
    

   /*
    Wishlist1.deleteMany(ido.id=req.user,function(err,docs){
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); */
   
   
    
 

 
module.exports=router;