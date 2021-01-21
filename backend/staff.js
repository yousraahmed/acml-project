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
const { findOne } = require('./models/teachingSlot.js');
const locations = require('./models/locations.js');
const e = require('express');
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
    if(password=='123456'&& existingUser.password=='123456'){
     
        if(password!=newpassword){
            
            const salt = await bcryptjs.genSalt();
            const passwordHashed = await bcryptjs.hash(newpassword,salt);
            const user= await staffMembers.findOneAndUpdate({"email":email},{"password":passwordHashed},{new:true})
            return res.send('Password Updated!')
        }
        else{
            res.send("Your new password can't be the same as your old password.")
            }
    }
    else{
    const isMatched=await bcryptjs.compare(password,existingUser.password);
    if(isMatched){
        if(password!=newpassword){
         if(newpassword!='123456'){
           const salt = await bcryptjs.genSalt();
            const passwordHashed = await bcryptjs.hash(newpassword,salt);
            const user= await staffMembers.findOneAndUpdate({"email":email},{"password":passwordHashed},{new:true})
            return res.send('Password Updated!')}
            else{
                res.send('Your password can not be 123456 ')
            }
        }
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
           
             const existingUser= await staffMembers.findOne({email:email});
             const isMatched=await bcryptjs.compare(password,existingUser.password);
             if(password=="123456"&& existingUser.password=='123456'){
                res.send('Please Change your password.')
               }
             if(isMatched){
         
         const token = jwt.sign({id:existingUser.id,email:existingUser.email,
         officeLocation:existingUser.officeLocation
         ,salary:existingUser.salary,role:existingUser.role, 
         name:existingUser.name, daysOff:existingUser.daysOff,department
         :existingUser.department,courseName:existingUser.courseName},""+process.env.JWT_KEY);
          
         res.setHeader("Access-Control-Allow-Origin", "*");
         
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

.put(async(req,res)=>{ 
    try{
    const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
    
    if(mem.department !='hr'){
       const location= await locations.findOne({"location":req.body.officeLocation})
       if(location !=null&& location.capacity>0){
     const user= await staffMembers.findOneAndUpdate({"email":mem.email},
    {"email":req.body.email,
    "officeLocation":req.body.officeLocation,
    "daysOff":req.body.daysOff,
    "role":req.body.role},
    {new:true})
     res.send('Profile Updated!')
    }
else{
    res.send("This location is either full or does not exist.Please enter a different location.")
}}
  else{
    const location= await locations.findOne({"location":req.body.officeLocation})
    const dept= await faculty.findOne({"department":req.body.department})
    if(location !=null&& location.capacity>0){
      
    const user= await staffMembers.findOneAndUpdate({"email":mem.email},
    {"email":req.body.email,
    "officeLocation":req.body.officeLocation,
    "daysOff":req.body.daysOff,
    "role":req.body.role,
    "salary":req.body.salary,
    "department":req.body.department,
    "courseName":req.body.courseName}
    ,{new:true})}
   
    
    else{
        res.send("This location is either full or does not exist.Please enter a different location.")
    }
    const existingUser= await staffMembers.findOne({email:req.body.email});
    const token = jwt.sign({id:existingUser.id,email:existingUser.email,
        officeLocation:existingUser.officeLocation
        ,salary:existingUser.salary,role:existingUser.role, 
        name:existingUser.name, daysOff:existingUser.daysOff,department
        :existingUser.department,courseName:existingUser.courseName},""+process.env.JWT_KEY);
      
       res.setHeader("Access-Control-Allow-Origin: *");
        
        res.header('auth-token',token).send(token)
        res.sendStatus(200);
   
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
.get(async(req,res)=>{
    try{
        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
          let rec= new attendance({
            id:mem.id,
            date:Date.now(),
            checkIn:Date.now(),
           checkOut:null,
           
            })
        rec.save()
        res.send("Signed In Successfully!")
           }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.route('/signOut')
.get(async(req,res)=>{
    try{
        
     const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY);
     
     var date= new Date();

     const rec= await attendance.findOneAndUpdate({"id":mem.id},{"checkOut":date},{new:true}).sort({ _id:-1});
     res.header("Access-Control-Allow-Origin", "*");
     res.send("Signed Out!") 
    }
    catch(error){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(error.message)
        
    }
})

//get missing hours
router.route('/delete')
.get(async (req,res)=>{
    try{
const res= await attendance.deleteMany();
    }
    catch(e){

    }
})

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

module.exports.app=app;
module.exports= router;