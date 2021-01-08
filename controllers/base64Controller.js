const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
var emp=new Image();
const { findById } = require('../models/photo.model');
var Cartlist=require('../models/cartlist.model');
var Filter=mongoose.model('Filter');

router.get('/',(req,res)=>{ var mysort = { date: -1 };
    Image.find({}, (err, results) => {
        if (err) throw err
        var mysort = { name: 1 };
        var thumb = []
        var cap1 = []
       
        for (var result of results) {
            thumb.push(result);
            //cap.push(result.img.data.toString('base64'));
            //cap.push(result.name);
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
           
            res.render('base/3dm', {
                thumb, ct:ct, cap1, user:req.user,
               
            })
    })
}).sort(mysort);;
      })
      
    /*
    Image.findById('5f92802573b14f5e64635327', function(err, result) {
        if (err) throw (err);
    
        var thumb = result.img.data.toString('base64');
        res.render('base/3dm', {img: thumb});
        //loader.load('C:/Users/Admin/web1/views/base/eyeball.fbx', function (object) { scene.add(object) });
       
       
    });*/
    
});

module.exports=router;