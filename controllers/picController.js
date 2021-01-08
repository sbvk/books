const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
var emp=new Image();
var Filter=mongoose.model('Filter');

router.get('/',(_req,res)=>{
    var cap1 = [];
    var mysort = { name: 1 };
    Filter.find(function(err,docs){
        if (err) console.log(err);
        else for (var result of docs) {
            cap1.push(result);    
        }
     res.render("pic/3dmodel",{cap1});
}).sort(mysort);
});

router.post('/fil',(req,res)=>{
    insertRecord(req,res);

});
function insertRecord(req,res)
{
    var fil=new Filter();
    fil.name=req.body.filter;
    Filter.findOne({name:req.body.filter},function(err,pl)
    {
        if(pl) {
            req.flash('error','Filter '+req.body.filter+' already exists!');
        res.redirect('/pic');
        }
    else {
    fil.save((err,docs)=>{
        if (err) console.log(err);
        else
       {
        req.flash('success','Added filter '+ req.body.filter);
        res.redirect('/pic');
       }
    });
}
});
}

module.exports=router;
