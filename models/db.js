const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://admin:Atlas%40123@cluster0.o7mpf.mongodb.net/BookDB',{useNewUrlParser:true, useUnifiedTopology: true,
useFindAndModify: false,poolSize: 100}, 
(err)=>{
    if(!err) {console.log('conn succeeded')}
    else{ console.log('Error in conn:'+ err)}
});

