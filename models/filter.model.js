const mongoose=require('mongoose');

var filterSchema=new mongoose.Schema({
    name:{
        type:String
    }
    
}
);
mongoose.model('Filter',filterSchema);
