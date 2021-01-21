const { Double } = require('mongodb');
const mongoose=require('mongoose');
const staffMembers=mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String,default:"123456"},
    id:{type:String,unique:true},
    name:{type:String,required:true},
    salary:{type:Number,required:true},
    salaryThismonth:{type:Number},
    officeLocation:{type:String},
    daysOff:{type:Array },
    department:{ type:String,required:true},
    courseName:{type:Array},
    role:{type:String},
    hours:{type:Number,default:0},
    missingDays:{type:Number,default:30},
    accidentalLeavesLeft:{type:Number, default:6},   //new
    annualLeavesBalance:{type:Number, default:2.5},  //new
    gender:{type:String, required:true}            //new
    
})
module.exports=mongoose.model('staffMembers',staffMembers);