const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
},
username:String,
text:String,
});

const postSchema = new mongoose.Schema(
{
user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true,
},

username:String,

text:{
type:String,
default:"",
},

image:{
type:String,
default:"",
},

likes:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
},
],

comments:[commentSchema],
},
{ timestamps:true }
);

module.exports = mongoose.model("Post", postSchema);