const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
const { findById } = require('../models/photo.model');
var Cartlist=require('../models/cartlist.model');
var Filter=mongoose.model('Filter');

router.post('/', function(req,res){

    Image.find({filter:{$in:req.body.filters}},function(err,reso){
        var mysort = { name: 1 };
        var thumb = []
        var cap1 = []
       
        if(err) console.log(err);
        else {console.log(req.body.filters);
            for (var result of reso) {
                thumb.push(result);
            }
         
        Filter.find(function(err,docu){
            if (err) console.log(err);
            else for (var result1 of docu) {
                cap1.push(result1);    
            }
       
    
            var ct;
            Cartlist.countDocuments({id:req.user},function(err,ct){
                if(err){
                    console.log(err);
                }
                console.log(ct);
                req.flash('success', 'Filters:'+req.body.filters);
                res.render('base/3dm', {
                    thumb, ct:ct, cap1, user:req.user,
                    success: req.flash('success')
                   
                })
        })
    }).sort(mysort);;
        }

    });

});


module.exports=router;