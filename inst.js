const express=require('express');
const router=express.Router();
const bcryptjs=require('bcryptjs');
require('dotenv').config()
const jwt =require('jsonwebtoken');


const teachingSlot = require('./teachingSlot.js')
const staffMembers = require('./staffMembers.js');
const attendance = require('./attendance.js');
const location= require('./locations.js');
const requests=require('./requests.js');
const staffIDs=require('./staffIDs.js')
const course=require('./course.js')
const courseDep= require('./courseDep.js')
const coverage= require('./coverage.js')
const faculty= require('./faculty.js')

const instructor= require('./instructors.js')


const { async } = require('rsvp');
const { Router } = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

////////INSTRUCTOR&COORD ROUTES///////
router.route('/viewcoursecoverage')
.get(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
        if(mem.role=="Instructor"){
        const rec=await coverage.find({"instructorID":mem.id},('-_id coverage course'));
        res.send(rec)
    }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.route('/assignedslot')
.get(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
        if(mem.role=="instructor"){
        const rec=await course.find({"instructorID":mem.id},('-_id courseName assigned slotTime slotLocation'));
        res.send(rec)
    }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

.put(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
        if(mem.role=="instructor"){
            const rec=await course.findOneAndUpdate({"instructorID":mem.id, "course":req.bodycourse},{"assigned":req.body.assigned});
            res.send(rec)
        
        }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})
//Assign an academic member to an unassigned slots in course(s) he/she is assigned to
router.route('/assignmember')
.put(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
        if(mem.role=="instructor"){
            const rec=await course.findOneAndUpdate({"instructorID":mem.id, "course":req.body.course},{"assigned":req.body.assigned});
            res.send(rec)
        
        }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.route('/viewAllStaff')
.get(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
        if(mem.role=="instructor"){
        const inst= await staffMembers.findOne({"id":mem.id})
    const dep=await staffMembers.find({"department":inst.department}||{"courseName":inst.courseName},
    function(err,docs){
        if(docs!=null){
            res.send(docs)
        }
        if(err){
            res.send(err)
        }
    }
    )}
}
catch(error){
    res.status(500).json({error:error.message});
}


})
//slot linking request.
router.route('/SLreq')
.get(async(req,res)=>{
  try{
    const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
     const reqs= await requests.find({"reciverID":mem.id,"type":"slotLinking"},function (err,docs) {
         if(docs!=null){
             res.send(docs)
         }
         else{
             res.send("there is no resquests sent to you")
         }
         if(err){
             req.send(err)
         }
         
     })}
     catch(error){
        res.status(500).json({error:error.message});
    }
   
   
})

//Accept the request and update the schedule or refuse it.
.put(async(req,res)=>{
   try
   { const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
       const reqs=await requests.findOneAndUpdate({"reqId":req.body.reqID,"reciverID":mem.id},{"state":req.body.state},{new:true})

    if(reqs!=null){
        if(req.body.state=="accepted"){
            const slot=new teachingSlot({
                staffID:reqs.senderID,
                slotTime:reqs.slotTime,
                slotLoc:reqs.slotLoc,
                slotDay:reqs.slotDay,
                courseName:reqs.courseName
            }
            )
            await slot.save();
            res.send("Your request is accepted, please check your schedule.")
        }
        else if(req.body.state == "refused"){
            res.send("Your request is refused.");
            
        }
    }
}
catch(error){
    res.status(500).json({error:error.message});
}
})

//Add/update/delete course slot(s) in his/her course.
router.route('/courseSlotsUpdate')
.post(async(req,res)=>{ 
 try { const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
      const staff = await teachingSlot.findOne({"staffID":req.body.staffID})
    if(staff != null){
        const slot=new teachingSlot({
            staffID:req.body.senderID,
            slotTime:req.body.slotTime,
            slotLoc:req.body.slotLoc,
            slotDay:req.body.slotDay,
            courseName:req.body.courseName
        }
        )
        await slot.save();
        res.send("Your schedule is added.")
    }
    else 
    {
        res.send("There is no such ID.");
        
    }
    if(err){
        res.send(err);
    }}
    catch(error){
        res.status(500).json({error:error.message});
    }
})
.put(async(req,res)=>{
    try
    {const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    const id = await teachingSlot.findOne({"staffID":req.body.teachingSlot});
    const updateSlots = await teachingSlot.findOneAndUpdate(
        {"slotTime":req.body.slotTime},req.body,{new:true},
        {"slotLocation":req.body.slotLoc},req.body,
        {"slotDay":req.body.slotDay},req.body,
        {"slotDate":req.body.slotDate},req.body,
        {"courseName":req.body.courseName},req.body
        )
        await updateSlots.save();
        res.send(updateSlots);}
        catch(error){
            res.status(500).json({error:error.message});
        }
})

.delete(async(req,res)=>{
  try {const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
       const id = await teachingSlot.findOne({"staffID":req.body.teachingSlot});
    if(id!=null){
        async function removeSlot(id){
            const removed = await teachingSlot.findOneAndRemove({"staffID":id},{"slotTime":req.body.slotTime},{"slotDate":req.body.slotDate})
        }
        id.teachingSlot.forEach(removed);
        res.send("The slot is deleted succesfuly.")
    } 
    else{
        res.send
        ("This staff member has no slots")
    }} catch(error){
        res.status(500).json({error:error.message});
    }
 })
module.exports.app=app;
module.exports= router;
 