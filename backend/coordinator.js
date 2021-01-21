const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')

require('dotenv').config()



const jwt=require('jsonwebtoken');
const { async } = require('rsvp');
const teachingSlot = require('./models/teachingSlot.js')
const staffMembers = require('./models/staffMembers.js');
const attendance = require('./models/attendance.js');
const location= require('./models/locations.js');
const requests=require('./models/requests.js');
const staffIDs=require('./models/staffIDs.js')
const course=require('./models/course.js')
const courseDep= require('./models/courseDep.js')
const coverage= require('./models/coverage.js')
const faculty= require('./models/faculty.js')

const instructor= require('./models/instructors.js')
const { request } = require('express');

router.route('/SLreq')
.get(async(req,res)=>{
    const reqID = await requests.findOne({"reqID":req.body.reqId});
    //const reqDetails = await requests.findOne({"senderID":req.body.senderID,"type":req.body.type,"date":req.body.date,"state":req.body.state});
    //const dep = await staffMembers.findOne({"department":req.body.department});

    
    if(req.body.type=="slot linking"){
        if(dep!=req.body.department){
            res.send("This request is not for your department");
        }
        else{
            //state = "Pending";
            res.send("The request number: "+reqID+ "\n Details: "+reqDetails);
        }        
    }
    
})

.put(async(req,res)=>{
    //const reqID = await requests.findOne({"reqID":req.body.reqId});
    //const state = await requests.findOne({"state":req.body.state});
    const {reqID,state} = request.findOne(req.body);
    const accept = false;
    const{slotTime, slotLocation} = course.findOne(req.body);
    if(!accept){
        state = "accepted";
        slotTime.push(new slotTime);
        slotLocation.push(new slotLocation);
        res.send(state + "Check your schedule.")
    }
    else{
        state = "refused";
        res.send(state);
    }

})

router.route('/courseSlotsUpdate')
.post(async(req,res)=>{ 
    const newCourse = new course({
        instructorID : req.body.instructorID,
        assigned : true,
        slotTime : req.body.slotTime,
        slotLocation : req.body.slotLocation,
        courseName : req.bpdy.courseName 
    })
    await newCourse.save();
    res.send("Your newly added course is:" +"\n"+newCourse);
})

.put(async(req,res)=>{
    const assigned = await course.findOne({"assigned":req.body.assigned});
    if(assigned){
        const updatedSlotTime = await course.findOneAndUpdate({"slotTime":req.body.slotTime},req.body,{new:true});
        const updatesSlotLocation =  await course.findOneAndUpdate({"slotLocation":req.body.slotLocation},req.body)
        res.send("Slots time and location are updated.")
    }
    else{
        res.send("You are not assigned to this course.")
    }
})

.delete(async(req,res)=>{
    const assigned = await course.findOne({"assigned":req.body.assigned});
    const courseName = await course.findOne({"courseName":req.body.courseName});
    if(assigned){
        const deleteCourse = await course.findOneAndRemove(courseName,null);
        const deleteTime = await course.findOneAndRemove({"slotTime":req.body.slotTime},null);
        const deleteLocation = await course.findOneAndRemove({"slotLocation":req.body.slotLocation},null);
        assigned = false;
        res.send("You are not assigned to this course anymore");
    }
    else{
        res.send("You are not assigned to this course already");
    }
 })

 module.exports=router

