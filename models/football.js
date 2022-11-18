const mongoose = require("mongoose") 
const footballSchema = mongoose.Schema({ 
 football_name:String,
 football_type:String, 
 football_size:Number
}) 
 
module.exports = mongoose.model("football", footballSchema) 