const { request } = require('express');
const mongoose=require('mongoose');

var autoIncrement= require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection);

const requests=mongoose.Schema({
       reqId:{type:Number,required:true,unique:true},////auto increment
       receiverID:{type:String,required:true},
       senderID:{type:String,required:true},
       state:{type:String,default:"pending"},
       type:{type:String,required:true},
       dayOff:{type:String},
       dayReqOff:{type:Date},               //this is the targeted day
       reason:{type:String},
       leaveType:{type:String},
       message:{type:String},
       documents:{type:String},              //new - to prove that staff member was sick
       dateIssued:{type:Date, default:new Date(Date.now())},   //new - date on which request was sent
       replacementID:{type:String},                            //new - ID of the replacement member
       slotTime:String,
       slotLoc:String,
       slotDay:String

});
requests.plugin(autoIncrement.plugin,{model: 'requests',field:'reqId'})

module.exports =mongoose.model('requests',requests)