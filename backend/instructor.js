const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')

require('dotenv').config()
const jwt=require('jsonwebtoken');
const key = 'asdfghjkl'
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





router.route('/viewCoverage')
.get(async(req,res)=>{
  const cover =  await coverage.findOne({"id":req.body.id});
  if(cover != null){
      res.send(cover);
  }
  else{
      res.send("No coverage is recorded for this course.")
  }
})

router.route('/slotAssign')
.get(async(req,res)=>{
    const course = await course.findOne({"id":req.body.id})
    if(cousre!=null){
        if(course.assigned==true){
            res.send(course.slotTime)
        }
        else{
            res.send("You are not assigned to any course");
        }
    }
})

router.route('/allStaff')
.get(async(req,res)=>{
    await staffMembers.find({"id":req.body.id},function(err,staff){
        if(staff!=null){
            res.send(staff)
        }
        else{
            res.send("This department has no staff!")
        }
    })
})


router.route('/AssignToUnassigned')
.put(async(req,res)=>{

})


router.route('/updateAssignment')
.put(async(req,res)=>{
    const instructorID = await course.findOne({"instructorID":req.body.instructorID})
    const assigned = await course.findOne({"assigned":req.body.assigned})
    if(assigned){
        const updatedAssignment = await course.findOneAndUpdate({"assigned":req.body.assigned},!assigned)
        const updatesSlotTime = await course.findOneAndRemove({"slotTime":req.body.slotTime})
        const updatesSlotLocation = await course.findOneAndRemove({"slotLocation":req.body.slotLocation})
        res.send("Sorry, you are not assigned to this course anymore");
    }
    else{
        const updatedAssignment = await course.findOneAndUpdate({"assigned":req.body.assigned},assigned);
        const updatesSlotTime = await course.findOneAndUpdate({"slotTime":req.body.slotTime},req.body);
        const updatesSlotLocation = await course.findOneAndUpdate({"slotLocation":req.body.slotLocation},req.body); 
        res.send("You are now assigned to a course");
    }
})

.delete(async(req,res)=>{
    const instructorID = await course.findOne({"instructorID":req.body.instructorID})
    const assigned = await course.findOne({"assigned":req.body.assigned})
    if(assigned===false){
        res.send("You are not assigned to this course")
    }
    else{
        const updatedAssignment = await course.findOneAndUpdate({"assigned":req.body.assigned},false)
        const updatesSlotTime = await course.findOneAndRemove({"slotTime":req.body.slotTime})
        const updatesSlotLocation = await course.findOneAndRemove({"slotLocation":req.body.slotLocation})
        res.send("You are not assigned to this course anymore");
    }
})

router.route('/removeAssigned')
.delete(async(req,res)=>{
    const instructorID = await course.findOne({"instructorID":req.body.instructorID})
    const assigned = await course.findOne({"assigned":req.body.assigned})
    if(assigned===false){
        res.send("You are not assigned to this course")
    }
    else{
        const updatedAssignment = await course.findOneAndUpdate({"assigned":req.body.assigned},false)
        const updatesSlotTime = await course.findOneAndRemove({"slotTime":req.body.slotTime})
        const updatesSlotLocation = await course.findOneAndRemove({"slotLocation":req.body.slotLocation})
        res.send("You are not assigned to this course anymore");
    }
})

module.exports=router
