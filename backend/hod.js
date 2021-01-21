const express=require('express');
const router=express.Router();
const bcryptjs=require('bcryptjs');
require('dotenv').config()
const jwt =require('jsonwebtoken');


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



const { async } = require('rsvp');
const { Router } = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
 //////////////////Mariam//////////////////
    //1st: Assign/delete/update a course instructor for each course in his department.
    router.route('/instructor')

    .post(async function(req,res){
        
        try{
            const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
            if(mem.role == "hod")
            {
                const hod = await staffMembers.findOne({"id":req.body.mem.id })///token //get the hod from table staffMembers by id
    
       const member =await staffMembers.findOne({"id": req.body.id})          //get the member from the table staffMembers by id
    
     if(hod!=null && member!=null){                                           //check if both are actually there in the table
       if(hod.department == member.department)                                //check if hod's department is the same as the member's department
       {
           const dep=await courseDep.findOne({"departmentName":hod.department})//get the department from table courseDep whose name is the same as that of the hod  to access its courses array
           let flg=false
           for(let i=0;i<dep.courseName.length;i++){                           //loop over the array of courses to:
               if(dep.courseName[i]==req.body.courseName)                      //check if the course sent by hod is in the department if the hod
               {
                   flg=true;
                   break;
               }
           }
           if(flg){
       
        await staffMembers.findOneAndUpdate({"id":req.body.id},{"role":"instructor","courseName":req.body.courseName},{new:true})
         res.send("Instructor Assigned Succesfully")                          //update that member's role in the staffMembers table to become an "instructor", and update the coursename to become the course they're gonna teach
       }
       else 
       {
           res.send("Instructor Does Not Exist In Your Department")
       }
       }
       else
       {
                res.send("This Course Is Not In Your Department")
       }
       }
       else{
           res.send("No such HOD or Member")
       }
            }
    
       
      }
      catch(error){
          res.status(500).json({error:error.message})
      }
    })
    .delete(async function(req, res){
        try{
            if(mem.role == "hod")
            {
                const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
       
                const hod = await staffMembers.findOne({"id": req.body.mem.id })  //get the hod from table staffMembers by id
                
                const member = await staffMembers.findOne({"id": req.body.id})   //get the member from table staffMembers by id
             
                if(hod.department == member.department)                          //check if hod's department is the same as the member's department
                {
                     const result = await instructors.findOneAndRemove({"id": req.body.id}) //find that instructor in the instructors table by id and remove them
                     if(result!=null)
                     { await findOneAndUpdate({"id":req.body.id},{"role":null,"courseName":null},{new:true})
                        return res.send("Instructor Deleted Successfully")
                     }
                 }
                 else
                 {
                     return res.send("No Data Provided")
                 }
            }
           
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    })
    
    .put(async function(req,res){
        try{
            const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
            if(mem.role == "hod")
            {
       const hod = await staffMembers.findOne({"id": req.body.mem.id })    //get the hod from table staffMembers by id
       
       const member = await staffMembers.findOne({"id": req.body.id})     //get the member from table staffMembers by id
    
       if(hod.departmentName == member.departmentName)                    //check if hod's department is the same as the member's department
       { 
           const dep=await courseDep.findOne({"departmentName":hod.department})  //get the department from table courseDep whose name is the same as that of the hod  to access its courses array
           let flg=false
           for(let i=0;i<dep.courseName.length;i++){                        //loop over the array of courses to: 
           if(dep.courseName[i]==req.body.courseName)                       //check if the course sent by hod is in the department if the hod
           {
               flg=true;
               break;
           }
          }
       if(flg){ //(below) find the instructor by id and update his courseName and departmentName to the courseName and departmentName sent by hod and 
        const output = await instructors.findOneAndUpdate({"id": req.body.id},{"courseName":req.body.courseName,"departmentName":req.body.departmentName},{new:true})
         if(output!=null){       //if there is such instructor then send output
         return res.send(output)
        }
         else
         {
             res.send("No Instructor With This ID ")
         }
       }
       else{res.send("This Course is Not in Your Department")}
    }
    else{
        res.send("This Member is Not in Your Department")
    }
    
            }
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    })
    
    //2nd: View all the staff in his/her department || View all the staff in his/her department per course along with their profiles
    router.route('/Staff')
    .get(async function(req,res){
        try{
            const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    
            if(mem.role == "hod")
            {
                const hod = await staffMembers.findOne({"id":req.body.mem.id })
                if(req.body.type=="department"){
                const output = await staffMembers.find({"department": hod.department},function(err,docs){
                    if(docs!=null){
                        res.send(docs)
                    }
                    else{
                        res.send(err)
                    }
                    if(err){
                        res.send(err)
                    }
                }) 
             }
                 if(req.body.type=="course"){
                     const dep=await courseDep.findOne({"departmentName":hod.department})
                     let flg=false
                     for(let i=0;i<dep.courseName.length;i++){
                         if(dep.courseName[i]==req.body.courseName){
                             flg=true;
                             break;
                         }
                     }
                     if(flg){
                     const output = await staffMembers.find({"courseName": req.body.course},function(err,docs){
                         if(err!=null){
                             res.send(docs)
                         }
                         else{
                             res.send(err)
                         }
                         if(err){
                             res.send(err)
                         }
                     })}
                     else{
                         res.send("this course is not in your dep")
                     }
                 }
                 else{
                     res.send("please specify course or dep")
                 }
            }
           
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    })
    
    
    
    //3rd: view the days off of a single staff in his/her department
    router.route('/DaysOff')
    .get(async function (req,res){
        try{
            const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
            if(mem.role == "hod") 
            {
    
       const hod = await staffMembers.findOne({"id": req.body.mem.id })
       if(req.body.id==null){
       const output = await staffMembers.find({"department": hod.department},('daysOff') )
        if(output!=null){
            res.send(output)
        }
        else{
            res.send("there is no staff in your dep")
        }
    }
       else{
           const stf=await staffMembers.findOne({"id":req.body.id})
           if(stf.department==hod.department){
           if(stf!=null){
               res.send(stf.daysOff)
           }
           else{
               res.send("no staff with this id")
           }}
           else{
               res.send("this member is not in your dep")
           }
           
       }
            }
            
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    })
    
    //4th: View all the “change day off/leave” requests sent by staff members in his/her department
    router.route('/requests')
    .get(async function(req,res){
        try{
            const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    
            if(mem.role == "hod") 
            {
       const hod = await staffMembers.findOne({"id":req.body.mem.id})
      
       const output = await requests.find({"type": "Change Day Off", "reciverID":hod.id} || {"type": "Leave", "reciverID":hod.id})
       if(output.length>0) {
           res.send(output)
       }
       else{
           res.send("There Are No Requests ")
       }
    
            }
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    })
    
    //5th: Accept a request. if a request is accepted, appropriate logic should be executed to handle this request.
    router.route('/acceptRequest')
    .put(async function(req,res){
        try{
            const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    
            if(mem.role == "hod")
            {
       const hod = await staffMembers.findOne({"id": req.body.hodid }) //get the hod by id from staffMembers table
    
       const request = await requests.findOne({"reqId": req.body.reqId})  //get the id of the request from the requests table
     console.log(request)
       const member = await staffMembers.findOne({"id": request.senderID}) 
        //get the member who sent that request
    if(request.reciverID == hod.id)
    {
        if(member.department == hod.department)                         //check if memeber is in department of hod
        { 
            //Handling Change Day Off Requests
            if(request.state == "pending" && request.type == "Change Day Off")       //check if request state is pending and its type
            {
             const output = await requests.findOneAndUpdate({"reqId": req.body.reqId}, {"state":"Accepted", "message": "The request with the following request id:"+ req.body.reqId + "is accpeted"}) //find the request by id and update its state to Accepted
             let dyof=["friday",req.body.newdayOff]                         
             await staffMembers.findOneAndUpdate({"id": request.senderID}, {"daysOff":dyof},{new:true}) 
             res.send("Request Accepted")
            }
    
            //Handling Leave Requests
            if(request.state == "pending" && request.type == "Leave")
            {
                
             const output = await requests.findOneAndUpdate({"reqId": req.body.reqId}, {"state":"Accepted", "message": "The request with the following request id:"+ req.body.reqId + "is accpeted"},{new:true})       
             res.send("Request Accepted")  
            }
            
            else
            {
                res.send("This Request Has Already Been Resolved")
            }
        
        }
        else 
        {
            res.send("This Member Is Not in Your Department")
        }
    }
    }
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    })
    
    //6th: Reject a request
    router.route('/rejectRequest')
    .put(async function(req,res){
        try{
            const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    
            if(mem.role == "hod")
            {
        const hod = await staffMembers.findOne({"id": req.body.mem.id }) //get the hod by id from staffMembers table
       // const hod = await staffMembers.findOne({"id": req.body.hodid })
    
        const request = await requests.findOne({"reqId": req.body.reqId})  //get the id of the request from the requests table
     
        const member = await staffMembers.findOne({"id": request.senderID})  //get the member who sent that request
     if(request.reciverID == hod.id)
     {
         if(member.department == hod.department)                         //check if memeber is in department of hod
         {
             if(request.state == "pending" && request.type == "Change Day Off")       //check if request state is pending and its type
             {
              const output = await requests.findOneAndUpdate({"reqId": req.body.reqId}, {"state":"Rejected", "message": "The request with the following request id:"+ req.body.reqId + "is rejected"}) //find the request by id and update its state to Accepted
              res.send("Request Rejected")
             }
             
             else if(request.state == "pending" && request.type == "Leave")
             {
              const output = await requests.findOneAndUpdate({"reqId": req.body.reqId}, {"state":"Rejected", "message": "The request with the following request id:"+ req.body.reqId + "is rejected"})  
              res.send("Request Rejected")       
             }
             
             else
             {
                 res.send("This Request Has Already Been Resolved")
             }
         }
        
         else 
         {
             res.send("This Member Is Not in Your Department")
         }
     }
    }
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    })
    
    
    //7th: View the coverage of each course in his/her department
    router.route('/coverage')
    .get(async function(req,res){
        try{
            const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    
            if(mem.role == "hod")
            {
      
        if(hod!=null)
        {
        const output = await coverage.find({"course": req.body.course,"department": hod.department},('coverage'))
        if(output.length>0)
        {
            res.send(output)
        }
        else
        {
            res.send("no courses available")
        }
        }
    else{
        res.send("invalid hod ID")
        } 
    }
        }
    catch(error){
        res.status(500).json({error:error.message})
    }
    })
    
    //8th: view teaching assigments of a course offered by his department (view who teaches some course in his department in which slot)
    router.route('/teachingAssignments')
    .get(async function(req,res){
        try{
            const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
            if(mem.role == "hod")
            {
      
      
        const hod = await staffMembers.findOne({"id":req.body.mem.id })
        const courses=await courseDep.findOne({"departmentName":hod.department})
        let fnl=[];
        async function tes(courseName) 
        {
            console.log(courseName)
            let slts=await teachingSlot.find({"courseName":courseName})
            if(slts.length>0)
            {
                fnl.push(slts)
              
            }
            console.log(fnl)
            
        }
       await courses.courseName.forEach(tes)
       res.send(fnl)
    }
        }
    catch(error){
        res.status(500).json({error:error.message})
    }
    })
    
    
    
    
    module.exports.app=app;
    module.exports= router;
     
    
    
    
      
    
    