
const mongoose=require('mongoose');
const instructors=mongoose.Schema({
     id:{type:String,required:true,unique:true},
     courseName:{type:Array,required:true},
     departmentName:{type:String,required:true}
})
module.exports=mongoose.model('instructors',instructors);