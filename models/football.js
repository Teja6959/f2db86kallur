const mongoose = require("mongoose") 
const footballSchema = mongoose.Schema({ 
 football_name:String,
 football_type:String, 
 football_size:{ 
    type:Number,
    min: 20,
    max: 50 }

}) 
 
module.exports = mongoose.model("football", footballSchema) 