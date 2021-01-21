const express=require('express');
const cors = require('cors')
const router=express.Router();
const bcrypt=require('bcrypt')
require('dotenv').config();
const jwt=require('jsonwebtoken');
const { async } = require('rsvp');
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

router.route('/viewReqState') //done
.post(async(req,res)=>{
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
            }
           } catch(error){
                res.status(500).json({error:error.message});
            }


})
router.route('/cancelReq') //done
.post(async (req,res)=>{
    try{ const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
   
     var today= new Date();
    
    const result= await requests.findOne({"reqId":req.body.rId,"senderID":mem.id})
    if (result!=null){
        if(result.dayReqOff>today){
           await requests.findOneAndDelete({"reqId":req.body.rId,"senderID":mem.id})
           res.send("CanceledSuccessfullya")
        }
        if(result.state=="pending"){
        await requests.findOneAndDelete({"reqId":req.body.rId,"senderID":mem.id})
        res.send("CanceledSuccessfully")

    } else{
        res.send("the request already has a response")
    }
}
    else{
        res.send("you cant delete this request")
    }
    res.header("Access-Control-Allow-Origin", "*");}

    catch(error){
        res.header("Access-Control-Allow-Origin", "*");
        res.status(500).json({error:error.message});
    }
})

router.route('/sendReplacementReq') //done
.post(async(req,res)=>{
   try{
       const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    const result= await teachingSlot.findOne({"staffID":req.body.replID,"courseName":req.body.cname});
    const dep= await staffMembers.findOne({"id":mem.id});
    const hod=await staffMembers.findOne({"department":dep.department,"role":"hod"});
   
    if(result!=null){
        const fady= await teachingSlot.findOne({"staffID":req.body.replID,"slotTime":req.body.sTime,"slotDay":req.body.sDay})
        if(fady==null){
            const request= new requests({
              receiverID:req.body.replID,
             senderID:mem.id,
             type:"replacement",
             slotTime: req.body.sTime,
             slotDay:req.body.sDay,
             dayReqOff:req.body.sdate
})

            await request.save();

            const request1= new requests({
                receiverID:hod.id,
               senderID:mem.id,
               type:"replacement",
               slotTime: req.body.sTime,
               slotDay:req.body.sDay,
               dayReqOff:req.body.sdate,
               replacementID:req.body.replID
  })
  
              await request1.save();

            res.send(request)
             console.log("replacement sent to staff and hod")
    }}

            else{
            
            const request= new requests({
            
                receiverID:hod.id,
                senderID:mem.id,
                type:"replacement",
                slotTime: req.body.sTime,
                slotDay:req.body.sDay,
                dayReqOff:req.body.date

                })

                await request.save();
                res.send(request)
               console.log("replacement sent to HOD")
               res.header("Access-Control-Allow-Origin", "*");
             }}
            catch(error){
                res.header("Access-Control-Allow-Origin", "*");
                res.status(500).json({error:error.message});
            } })

router.route('/viewReplacmentReq') //done
.get(async(req,res)=>{
    try{ const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    const result=await requests.find({$or: [{"receiverID":mem.id,"type":"replacement"} ,{"senderID":mem.id,"type":"replacement"}]},
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
    })

    
     }
    catch(error){
        res.status(500).json({error:error.message});
    }

})
router.route('/viewSchedule') //done
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
        res.status(500).json({error:error.message});}
     } )

router.route('/changeDayReq') //done
.post(async (req,res)=>{
    try{
       const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    const dep= await staffMembers.findOne({"id":mem.id})
    if(dep!=null){
               const hod=await staffMembers.findOne({"department":dep.department,"role":"hod"})
               if(hod!=null){
                const request= new requests({
                
                    receiverID:hod.id,
                    senderID:mem.id,
                    type:"changeDayOff",
                    dayOff:req.body.dayOff,
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
router.route('/sendSlotLinkingRequest') //done
.post(async(req,res)=>{
    try{
      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    
    const course= await teachingSlot.findOne({"staffID":mem.id,"courseName":req.body.cname})
    if(course!=null){

    const cood= await staffMembers.findOne({"courseName":req.body.cname,"role":"coordinator"})
    if(cood!=null){
    const request= new requests({
 
        receiverID:cood.id,
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
router.route('/getNotified') //done
.post(async(req,res)=>{
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
router.route('/sendLeaveRequest') //done
.post(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

        let sickdate=req.body.date;
        let s= new Date(sickdate);
        let smonth= s.getMonth()+1;
        let sday=s.getDate();
       
        
        var today= new Date();
        var tmonth= today.getMonth()+1;
        var tday=today.getDate();
        let t="";
        
    const dep= await staffMembers.findOne({"id":mem.id})
    if(dep!=null){
        console.log("in if")
            const hod=await staffMembers.findOne({"department":dep.department,"role":"hod"})
            if(hod!=null){
                console.log("in iff")
                                    if(req.body.leavetype=="compensation"){
                                        console.log("in comp")
                                        if(req.body.reason!=t){

                                const request= new requests({
                                
                                    receiverID:hod.id,
                                    senderID:mem.id,
                                    type:"leave",
                                    leaveType:req.body.leavetype,
                                    reason:req.body.reason,
                                    dayReqOff:req.body.date
                    
                                    })
                                    await request.save();
                                res.send(request);}else{res.send("a")}
                                    
                            }
                            
                                if(req.body.leavetype=="maternity"  ){
                                    if(dep.gender=="female"){
                                    if(req.body.docu!=t){

                                const request= new requests({
                                
                                    receiverID:hod.id,
                                    senderID:mem.id,
                                    type:"leave",
                                    leaveType:req.body.leavetype,
                                    documents:req.body.docu,
                                    
                                    dayReqOff:req.body.date

                                })
                                await request.save();
                                res.send(request);}else{res.send("b")}}else{res.send("c")}}

                            
                            if(req.body.leavetype=="sick"){
                                console.log("in sick");

                                if(req.body.docu!=t){

                                 if(tmonth==smonth && sday+3 >=tday){
                              
                                const request= new requests({
                                
                                    receiverID:hod.id,
                                    senderID:mem.id,
                                    type:"leave",
                                    leaveType:req.body.leavetype,
                                    documents:req.body.docu,    
                                    dayReqOff:req.body.date

                                })
                                await request.save();
                                res.send(request);

                            }else{
                                res.send("d")
                            }
                        } else{res.send("b")}} 

                            if(req.body.leavetype=="accidental"){
                               console.log( "in ifff")
                                if(dep.accidentalLeavesLeft >0){
                                    if(dep.annualLeavesBalance>0.5){
                                    let left= dep.accidentalLeavesLeft - 1;
                                    let left2 =dep.annualLeavesBalance -1;
                                   const upd= await staffMembers.findOneAndUpdate({"id":dep.id},{"accidentalLeavesLeft":left},{new:true});
                                   const upd2= await staffMembers.findOneAndUpdate({"id":dep.id},{"annualLeavesBalance":left2},{new:true});

                                const request= new requests({
                                
                                    receiverID:hod.id,
                                    senderID:mem.id,
                                    type:"leave",
                                    leaveType:req.body.leavetype,
                                    dayReqOff:req.body.date

                                })
                                await request.save();
                                res.send(request);

                            }else{res.send("y")}
                         } else{
                                res.send("x")
                            }
                        }

                        if(req.body.leavetype=="annual"){
                           
                            if(dep.annualLeavesBalance>0.5   ){
                                if(today<s){
                                let left2 =dep.annualLeavesBalance -1;
                                   
                                   const upd3= await staffMembers.findOneAndUpdate({"id":dep.id},{"annualLeavesBalance":left2},{new:true});

                            const request= new requests({
                                
                                receiverID:hod.id,
                                senderID:mem.id,
                                type:"leave",
                                leaveType:req.body.leavetype,
                                dayReqOff:req.body.date

                            })
                            await request.save();
                            res.send(request);}else{res.send("f")}}
                            else{res.send("y")}
                        }    
                        else{res.send("g")}     
                            
                     
    }
}
   }
    catch(error){
        res.status(500).json({error:error.message});
    }

})



    
module.exports=router    

