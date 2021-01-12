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
/////////////////TOKA'S ROUTES///////////////////
router.route('/viewReqState')
.get(async(req,res)=>{
    try{
    const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    if(req.body.state=="accepted"){
    const result= await requests.find({"senderID": mem.id,"state":"accepted"},
    function(err,docs){
        if(docs!=null){
            res.send(docs);
        }
        else{
            res.send("there are no any accepted requests")
        }
        if(err)
        res.send(err)
    })
   }
    if(req.body.state=="pending"){
        //console.log("in if")
        const result= await requests.find({"senderID": mem.id,"state":"pending"},
        
        function(err,docs){
            if(docs!=null){
                res.send(docs);
            }
            else{
                res.send("there are no any pending requests")
            }
            if(err)
            res.send(err) 
        })
        }
        if(req.body.state=="rejected"){
            const result= await requests.find({"senderID": mem.id,"state":"rejected"},
            function(err,docs){
                if(docs!=null){
                    res.send(docs);
                }
                else{
                    res.send("there are no any rejected requests")
                }
                if(err)
            res.send(err)
            })
            }}
            catch(error){
                res.status(500).json({error:error.message});
            }


})
router.route('/cancelReq')
.delete(async (req,res)=>{
    try{ const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
   
     var today= new Date();
    
    const result= await requests.findOne({"reqId":req.body.rId,"senderID":mem.id})
    if (result!=null){
        if(result.dayReqOff>today){
           await requests.findOneAndDelete({"reqId":req.body.rId,"senderID":mem.id})
           res.send("request that is yet to come canceled successfuly")
        }
        if(result.state=="pending"){
        await requests.findOneAndDelete({"reqId":req.body.rId,"senderID":mem.id})
        res.send("pending request canceled successfully")

    }}
    else{
        res.send("the request already had a response")
    }}

    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.route('/sendReplacementReq')
.post(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    const result= await teachingSlot.findOne({"staffID":req.body.replID,"courseName":req.body.cname})
   
    if(result!=null){
        const fady= await teachingSlot.findOne({"staffID":req.body.replID,"slotTime":req.body.sTime,"slotDay":req.body.sDay})
        if(fady==null){
            const request= new requests({
              reciverID:req.body.replID,
             senderID:mem.id,
             type:"replacement",
             dayReqOff:req.body.date
})
            await request.save();
            res.send(request)
             console.log("replacement sent to staff ")
    }
}
const dep= await staffMembers.findOne({"id":mem.id})

if(dep!=null){
   
const hod=await staffMembers.findOne({"department":dep.department,"role":"HOD"})

if(hod!=null){
    console.log("hod foun")
 const request= new requests({
 
     reciverID:hod.id,
     senderID:mem.id,
     type:"replacement",
     dayReqOff:req.body.date

    })
    await request.save();
    res.send(request)
 console.log("replacement sent to HOD")
}
}
 else{
     res.send("there is no such a department ")
 }}
 catch(error){
    res.status(500).json({error:error.message});
}

})
router.route('/viewReplacmentReq')
.get(async(req,res)=>{
    try{ const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    const result=await requests.find({"senderID":mem.id,"type":"replacement"}||{"reciverID":mem.id,"type":"replacement"},
    function (err,docs) {
        if(docs!=null){
            res.send(docs)
        }
        else{
            res.send("there is no replacmennt requests for this member")
        }
        if(err){
            res.send(err)
        }
    })}
    catch(error){
        res.status(500).json({error:error.message});
    }

})
router.route('/viewSchedule')
.get(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    await teachingSlot.find({"staffID":mem.id},
    function(err,docs){
        if(docs.length>0){
        res.send(docs);}
        else{
            res.send("there is no staff with this ID")
        }

    } )
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.route('/changeDayReq')
.post(async (req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    const dep= await staffMembers.findOne({"id":mem.id})
    if(dep!=null){
               const hod=await staffMembers.findOne({"department":dep.department,"role":"HOD"})
               if(hod!=null){
                const request= new requests({
                
                    reciverID:hod.id,
                    senderID:mem.id,
                    type:"changeDayOff",
                    reason:req.body.reason
    
                   })
                   await request.save();
                res.send(request)
                   
           }}
           else{
           res.send("there is no member with this id")}}
           catch(error){
            res.status(500).json({error:error.message});
        }

})
router.route('/sendSlotLinkingRequest')
.post(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    
    const course= await teachingSlot.findOne({"staffID":mem.id,"courseName":req.body.cname})
    if(course!=null){

    const cood= await staffMembers.findOne({"courseName":req.body.cname,"role":"coordinator"})
    if(cood!=null){
    const request= new requests({
 
        reciverID:cood.id,
        senderID:mem.id,
        type:"slotLinking",
        slotTime:req.body.stime,
       slotLoc:req.body.sLoc,
       slotDay:req.body.sDay,
       dayReqOff:req.body.sdate
        
   
       })  
       await request.save();
        res.send(request);
    } else{
        res.send("there is no course coordinator")
    }}
    else{
        res.send("you cant place the request")
    }}
    catch(error){
        res.status(500).json({error:error.message});
    }

}
)
router.route('/getNotified')
.get(async(req,res)=>{
    try{
    const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    let result= await requests.find({"senderID":mem.id},
    function(err,docs){
        if(docs!=null){
            const messages= docs.map(element => element.message)
            if(messages===0){
                res.send("no notifications")

            }
            else{
                res.send(messages)
            }
        
        }
        else{
            res.send("you didnt place any requests")
        }
        if(err){
            res.send(err)
        }

        
    }
    
    )}
    catch(error){
        res.status(500).json({error:error.message});
    }
}
)
router.route('/sendLeaveRequest')
.post(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    const dep= await staffMembers.findOne({"id":mem.id})
    if(dep!=null){
            const hod=await staffMembers.findOne({"department":dep.department,"role":"HOD"})
            if(hod!=null){
                if(req.body.leavetype=="compensation"){

             const request= new requests({
             
                 reciverID:hod.id,
                 senderID:mem.id,
                 type:"leave",
                 leaveType:req.body.leavetype,
                 reason:req.body.reason,
                 dayReqOff:req.body.date
 
                })
                await request.save();
             res.send(request);
                
        }
        else {
            const request= new requests({
             
                reciverID:hod.id,
                senderID:mem.id,
                type:"leave",
                leaveType:req.body.leavetype,
                
                dayReqOff:req.body.date

               })
               await request.save();
            res.send(request);

        }
    }
    }
    else{
        res.send("there is no member with this id")

    }}
    catch(error){
        res.status(500).json({error:error.message});
    }

})
module.exports.app=app;
module.exports= router;