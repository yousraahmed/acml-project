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
const { findOne } = require('./teachingSlot.js');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));



router.route('/changepass')
.get(async (req,res,next)=>{
    res.send('Please change your password')
     
})
.put(async(req,res,next)=>{
   try{let email=req.body.email
   let password=req.body.password;
   let newpassword=req.body.newpassword;
    if(!password||!newpassword){
        res.send("Please Enter a valid email or password");
    }

    const existingUser= await staffMembers.findOne({email:email});
    if(password=='123456'){
        if(password!=newpassword){
            const salt = await bcryptjs.genSalt();
            const passwordHashed = await bcryptjs.hash(newpassword,salt);
            const existingUser= await staffMembers.findOneAndUpdate({"email":email},{"password":passwordHashed},{new:true})
            return res.send('Password Updated!')}
        else{
            res.send("Your new password can't be the same as your old password.")
            }
    }
    else{
    const isMatched=await bcryptjs.compare(password,existingUser.password);
    if(isMatched){
        if(password!=newpassword){
            const salt = await bcryptjs.genSalt();
            const passwordHashed = await bcryptjs.hash(newpassword,salt);
            const existingUser= await staffMembers.findOneAndUpdate({"email":email},{"password":passwordHashed},{new:true})
            return res.send('Password Updated!')}
        else{
            res.send("Your new password can't be the same as your old password.") }
     }
    else{
        res.send('Invalid Old password')
     }
    }}
    catch(error){
        res.status(500).json({error:error.message});
    
       }
})


/////////////////////YOUSRA'S ROUTES///////////////////////////

router.route('/login') 
    .get(async(req, res, next) => { 
        res.send('LogIn page'); 
    }) 

    .post(async(req,res)=>{
        try{
            const {email,password}=req.body;
            if(!email||!password){
                res.send("Please enter a valid email or password.");
    
            }
            if(!await staffMembers.findOne({email:email})){
                res.send('User is not registered. Please contact HR.')
            }
            if(password=="123456"){
                 res.send('Please Change your password.')
                }
             const existingUser= await staffMembers.findOne({email:email});
             const isMatched=await bcryptjs.compare(password,existingUser.password);
             
             if(isMatched){
         
         const token = jwt.sign({id:existingUser.id,email:existingUser.email,
         officeLocation:existingUser.officeLocation
         ,salary:existingUser.salary,role:existingUser.role, 
         name:existingUser.name, daysOff:existingUser.daysOff,department
         :existingUser.department,courseName:existingUser.courseName},""+process.env.JWT_KEY);
          
         res.setHeader(`Access-Control-Allow-Origin`, `*`);
         
         res.header('auth-token',token).send(token)
         res.sendStatus(200);
         const mem=jwt.decode(req.header('token'),process.env.JWT_KEY);
         }
        
         
    
            if(!isMatched)
        {
           res.send("Invalid credentials");

        }         }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
})
 

///logout
router.route('/logout')
.get(async(req,res)=>
{ 
 res.redirect('/')
})



///Update their profile
router.route('/updateprofile')
.get(async(req,res)=>{
res.send('Update Your Profile.')
})

.put(async(req,res)=>{ //check if email is unique??
    try{
    const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    
    if(mem.department !='hr'){
     const user= await staffMembers.findOneAndUpdate({"email":mem.email},
    {
    "officeLocation":req.body.officeLocation,
    "daysOff":req.body.daysOff,
    "role":req.body.role},
    {new:true})
    res.send('Profile Updated!')
    }
  else{
    const user= await staffMembers.findOneAndUpdate({"email":mem.email},
    {
    "officeLocation":req.body.officeLocation,
    "daysOff":req.body.daysOff,
    "role":req.body.role,
    "salary":req.body.salary,
    "department":req.body.department,
    "courseName":req.body.courseName}
    ,{new:true})
   
 res.send('Profile Updated!')
  }
}
catch(e){
    console.log(e)
}     
      
          
    }
)


//view profile
router.route('/viewprofile')
    .get(async(req,res)=>{
       try{
       const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
      
       res.send( 'Name :'+mem.name +'\n'+'Email : '+ mem.email+
        '\n'+ 'Id : ' + mem.id+
        '\n'+'Office Location : '+ mem.officeLocation+
        '\n'+'Salary : '+mem.salary+
        '\n'+ 'DaysOff : '+ mem.daysOff+
        '\n'+ 'Department : ' +mem.department+
        '\n'+'Role : '+mem.role );}
        catch(error)
    {
       res.status(500).json({error:error.message});
    }
   
    })

    

//signin
router.route('/signin')
.post(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
          let rec= new attendance({
            id:mem.id,
            date:Date.now(),
            checkIn:req.body.time, //el time 3ndy bayez
           checkOut:null,
          // status=null
            })
        rec.save()
        res.send("Signed In Successfully!")
           }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.route('/signout')
.put(async(req,res)=>{
    try{
        
     const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
     
     var date= new Date();
     console.log(date);
     const rec= await attendance.findOneAndUpdate({"id":mem.id},{"checkOut":date},{new:true}).sort({ _id:-1});
     return res.status(500).send("Signed Out!") 
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})
//get missing hours


router.route('/missing hours')
.get(async(req,res)=>{
    const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    //for month ===nowww
  
    var datenow=new Date();
    const rec=await attendance.find({id:mem.id},('date -_id missinghours'));
    res.send(rec)
})

//records
 router.route('/records')
    .get(async(req,res)=>{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
        const rec=await attendance.find({id:mem.id},('date -_id'));
        res.send(rec);
    })

 //get month
.post(async (req,res)=>{
    try{
    const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    
    const mymonth= req.body.month
    var nextmonth;
    if(mymonth=='January'){
        nextmonth="Febuary"
    }
    if(mymonth=='Frebuary'){
        nextmonth="March"
    }
    if(mymonth=='March'){
        nextmonth="April"
    }
    if(mymonth=='April'){
        nextmonth="May"
    }
    if(mymonth=='May'){
        nextmonth="June"
    }
    if(mymonth=='June'){
        nextmonth="July"
    }
    if(mymonth=='July'){
        nextmonth="August"
    }
    if(mymonth=='August'){
        nextmonth="September"
    }
    if(mymonth=='september'){
        nextmonth="October"
    }
    if(mymonth=='October'){
        nextmonth="November"
    }
    if(mymonth=='November'){
        nextmonth="December"
    }
    if(mymonth=='December'){
        nextmonth="January"
    }
    const startdate=new Date('2020-'+mymonth+'-12');
    const enddate=new Date('2020'+'-'+nextmonth+'-11');
    startdate.setHours(2,0,0,0);
    enddate.setHours(1,59,0,0);
   const rec= await attendance.find({id:mem.id,date:{
        $gte: startdate,
        $lte: enddate }
},('date -_id'))
res.send(rec)}
catch(error)
{
    res.status(500).json({error:error.message});
}
})

router.route('/viewReqState')
.post(async(req,res)=>{
   // try{
    //const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    if(req.body.state=="accepted"){
    const result= await requests.find({"senderID": req.body.id,"state":"accepted"},
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
        const result= await requests.find({"senderID": req.body.id,"state":"pending"},
        
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
            const result= await requests.find({"senderID": req.body.id,"state":"rejected"},
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
           /*} catch(error){
                res.status(500).json({error:error.message});
            }*/


})
router.route('/sendReplacementReq')
.post(async(req,res)=>{
   // try{
       // const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);

    const result= await teachingSlot.findOne({"staffID":req.body.replID,"courseName":req.body.cname})
   
    if(result!=null){
        const fady= await teachingSlot.findOne({"staffID":req.body.replID,"slotTime":req.body.sTime,"slotDay":req.body.sDay})
        if(fady==null){
            const request= new requests({
              receiverID:req.body.replID,
             senderID:req.body.id,
             type:"replacement",
             dayReqOff:req.body.date
})
            await request.save();
            res.send(request)
             console.log("replacement sent to staff ")
    }
}
const dep= await staffMembers.findOne({"id":req.body.id})

if(dep!=null){
   
const hod=await staffMembers.findOne({"department":dep.department,"role":"HOD"})

if(hod!=null){
    console.log("hod foun")
 const request= new requests({
 
     receiverID:hod.id,
     senderID:req.body.id,
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
 }/*}
 catch(error){
    res.status(500).json({error:error.message});
}*/

})
module.exports.app=app;
module.exports= router;