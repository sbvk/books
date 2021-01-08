require('./models/db');
require('./models/photo.model');
require('./models/filter.model');
const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');
const multer=require('multer');
const picController=require('./controllers/picController');
const base64Controller=require('./controllers/base64Controller');
const cartController=require('./controllers/cartController');
const cart1Controller=require('./controllers/cart1Controller');
const icartController=require('./controllers/icartController');
const icart1Controller=require('./controllers/icart1Controller');
const filterController=require('./controllers/filterController');
const fs = require('fs');
const session=require('express-session');
const mongoose=require('mongoose');
var MongoStore=require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var app=express();
var flash=require('connect-flash');

app.use(flash());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave:false,
    saveUninitialized:false,
    store:new MongoStore({mongooseConnection:mongoose.connection}),
    cookie:{maxAge:100*60*1000}
}))


app.use(function(req,res,next){
    res.locals.success=req.flash('success');
    //res.locals.error=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.message=req.flash('message');
res.locals.session=req.session;

next();
});

app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());
app.use(express.static(__dirname+'/'))

app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine','hbs');

app.listen(process.env.PORT || 3000,function(){
    console.log('express server started at port:3000');
});

var Filter=mongoose.model('Filter');

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now())
    }
});
var upload=multer( {
    storage:storage
});
var imgModel = require('./models/photo.model');

const Image=mongoose.model('Image');
app.get('/upl', (req, res) => { 
    Image.find({}, (err, items) => { 
        var cap1 = [];
        var mysort = { name: 1 };
        if (err) { 
            console.log(err); 
        } 
        else {  
            
            for (var result of items) {
              var thumb=result.img.data.toString('base64');
            var name=result.name;
            var desc=result.desc;
            var price=result.price;
            var filter=result.filter;
            }
            Filter.find(function(err,docu){
                if (err) console.log(err);
                else for (var result1 of docu) {
                    cap1.push(result1);    
                }
            res.render('pic/3dmodel', { item: thumb, name:name, desc:desc, price:price, filter:filter, cap1 }); 
            }).sort(mysort);
            
        } 
    }); 
});


app.post('/uploadfile', upload.single('image'), (req, res, next) => { 
  
    var obj = { 
        name: req.body.name, 
        desc: req.body.desc, 
        price: req.body.price,
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/fbx',
            base: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)).toString('base64')
        },
        filter:req.body.filters,
        date: new Date(),
        
    } 
    imgModel.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // item.save(); 
            
            res.redirect('/upl'); 
        } 
    }); 
}); 


app.use('/pic',picController);
app.use('/base',base64Controller);
app.use('/cart',cartController);
app.use('/cart1',cart1Controller);
app.use('/icart',icartController);
app.use('/icart1',icart1Controller);
app.use('/filter',filterController);
