const express= require('express');

const mongoose= require ('mongoose'); 
const attendance = require('./attendance.js');
const app = express();
app.use(express.json());
//require('dotenv').config()
const bcryptjs=require('bcryptjs');
const jwt =require('jsonwebtoken');
//const { nextTick } = require('process')
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`this server is running on port ${PORT}`);
});
mongoose.connect( "mongodb+srv://advancedpro:advanced1234@cluster0.lugj5.mongodb.net/acml?retryWrites=true&w=majority"
, { useNewUrlParser: true },{ useUnifiedTopology: true }).then(console.log("thank you , you're in "))


const staffmemroutes=require('./staff.js');
const hrroutes=require('./hr.js');
const academicmem= require('./academicmem')
const inst= require('./inst.js')
const hod=require('./hod')
app.use('',staffmemroutes) 
app.use('/hod',hod)
app.use('/instructor',inst)
app.use('/hr',hrroutes) 
app.use('/academicmember',academicmem)






app.use(express.urlencoded({extended:false}));

/*const url = "mongodb+srv://advancedpro:advanced1234@cluster0.lugj5.mongodb.net/acml?retryWrites=true&w=majority";///change
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
}
mongoose.connect(url,connectionParams).then(()=>{
    console.log("db is successfuly connected")
}).catch((error)=>{
    console.log(error)
});*/




