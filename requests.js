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
       dayReqOff:{type:Date},
       reason:{type:String},
       leaveType:{type:String},
       message:{type:String},
       dayOff:{type:String},
       slotTime:String,
       slotLoc:String,
       slotDay:String,
       documents:{type:Boolean}
     

    

});
requests.plugin(autoIncrement.plugin,{model: 'requests',field:'reqId'})

module.exports =mongoose.model('requests',requests)