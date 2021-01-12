const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')

require('dotenv').config()
const jwt=require('jsonwebtoken');
const key = 'asdfghjkl'
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




router.route('/locationAffairs')
.post(async(req,res)=>{
    try{
//    const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
//     if(mem.department=="hr")
  { const l=await location.findOne({"location":req.body.location})
   if(l==null){
    const loc=new location({
        location:req.body.location,
        remainingPlaces:req.body.capacity,
        capacity:req.body.capacity,
        type:req.body.type})
    
    await loc.save()
    res.send("location inserted")
    console.log("location inserted");
   }
   else{
       res.send("please enter a new location name")
   }
   
    }
    // else{
    //     res.send("this route for hr only ")
    // }
}
    catch(error){
        res.status(500).json({error:error.message});
    }
})

.put(async(req,res)=>{
    try
    {
        // const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
        // if(mem.department=="hr")
   { const loc=await location.findOne({"location":req.body.location})
    if(loc!=null){
    if(req.body.capacity!=null){
        let newcap=req.body.capacity
        let remnew=loc.remainingPlaces+(newcap-loc.capacity)
        let result= await location.findOneAndUpdate({"location":req.body.location},{"capacity":req.body.capacity,"remainingPlaces":remnew},{new:true})
       
    }
    result=await location.findOneAndUpdate({"location":req.body.location},req.body,{new:true})
    
    
    res.send("the location updated !");}}
    // else{
    //     res.send("this route for hr only")
    // }
}
    catch(error){
        res.status(500).json({error:error.message});
    }
})
router.route('/deleteLocation')
.post(async(req,res)=>{
    try
    { 
 //         const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
 //    if(mem.department=="hr")
       { const result=await location.findOneAndRemove({"location":req.body.location})
     //console.log("deletesd")
     if(result!=null){
         res.send("the location deleted successfuly")
     }
     else{
         res.send("there is no data for this location")}   
     
 }
 // else{
 //     res.send("this route for hr only")
 // }
 }
 catch(error){
     res.status(500).json({error:error.message});
 }
 
 })
router.route('/facultyAffairs')
.post(async(req,res)=>{
  try {
          // const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
        // if(mem.department=="hr")
      {const fi=await faculty.findOne({"facultyName":req.body.facultyName})
    if(fi==null)
   { const fac=new faculty({
       facultyName:req.body.facultyName
    })
    await fac.save();
    if(req.body.departmentName!=null)
   { async function makedep(depname){
        const dep= new courseDep({
            departmentName:depname
        })
        await dep.save();
    }
    fac.departmentName.forEach(makedep)}
    res.send("faculty inserted!");
    console.log("faculty inserted");}
    else{
        res.send("the faculty already inserted")
    }}
    // else{
    //     res.send("this route for hr only")
    // }
   }
   catch(error){
    res.status(500).json({error:error.message});
}
})
.put(async (req,res)=>{
    try{
//      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
//    if(mem.department=="hr")
       {const result=await faculty.findOne({"facultyName":req.body.facultyName})
    if(result!=null){
        async function removedep(depname){
           const removed= await courseDep.findOneAndRemove({"departmentName":depname})
        }
        result.departmentName.forEach(removedep)
       
          const updt=  await faculty.findOneAndUpdate({"facultyName":req.body.facultyName},req.body,{new:true})
            async function makedep(depname){
                const dep= new courseDep({
                    departmentName:depname
                })
                await dep.save();
            }
            updt.departmentName.forEach(makedep)
            res.send("the faculty updated !"); 
            console.log("faculty updated successfuly")
        }
        else{
            res.send("there is no faculty with this name !")
        }
    }
    //    else{
    //        res.send("this route for hr only")
    //    }
      } 
      catch(error){
        res.status(500).json({error:error.message});
    }
})
router.route('/deletefaculty')
.post(async(req,res)=>{
    
     try { 
    //      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
    //  if(mem.department=="hr")
          { const result=await faculty.findOne({"facultyName":req.body.facultyName})
        if(result!=null){
            async function removedep(depname){
               const removed= await courseDep.findOneAndRemove({"departmentName":depname})
            }
            result.departmentName.forEach(removedep)
           await faculty.findOneAndRemove({"facultyName":req.body.facultyName})
            res.send("the faculty deleted successfuly")
            
        }
        else{
            res.send("no faculty with this name")
        }
    }
    //  else{
    //      res.send("this route for hr only")
    //  }
    }
        catch(error){
            res.status(500).json({error:error.message});
        }
})

router.route('/departmentAffairs')
.post(async(req,res)=>{
 try {
//      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
//  if(mem.department=="hr")
     { const fac= await faculty.findOne({"facultyName":req.body.facultyName});
    if(fac!=null){
        console.log("faculty to add department found")
        fac.departmentName.push(req.body.departmentName)
        const fin=await courseDep.findOne({"departmentName":req.body.departmentName})
        if(fin==null)
        {const dep=new courseDep({
            departmentName:req.body.departmentName
        })
        await dep.save();
        await fac.save();
        res.send("department inserted !")}
        else{
            res.send("this department already in this faculty ")
        }
      
    }
    else{
        res.send('there is no such a faculty')
    }}
    //  else{
    //      res.send("this route for hr only")
    //  }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
  
})
.put(async (req,res)=>{
    
     try   {
        
            //      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
            //  if(mem.department=="hr")
         {const fac=await faculty.findOne({"facultyName":req.body.facultyName})
        if(fac!=null){
            const indx=fac.departmentName.indexOf(req.body.departmentName)
            if(fac.departmentName.includes(req.body.departmentName)){
                const deldep =await courseDep.findOneAndRemove({"departmentName":req.body.departmentName})
                const addep=new courseDep({
                    departmentName:req.body.departmentName2
                })
                await addep.save();
            fac.departmentName.splice(indx,1,req.body.departmentName2)
            await fac.save();
            console.log("department updated successfuly")
            res.send("the department updated !");}
            else{
                res.send("the department you want to update does not exist")
            }
        }
        else{
            res.send('the faculty you want to update a department from it doesnt exist')
        }
        }
        // else{
        //     res.send("this route for hr only")
        // }
      }
      catch(error){
        res.status(500).json({error:error.message});
    }  
})
router.route('/deletedepartment')
.post(async(req,res)=>{
  try 
    {
            //      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
            //  if(mem.department=="hr")
        const fac=await faculty.findOne({"facultyName":req.body.facultyName})
    if(fac!=null){
        if(fac.departmentName.includes(req.body.departmentName)){
            const deldep =await courseDep.findOneAndRemove({"departmentName":req.body.departmentName})
         const indx=fac.departmentName.indexOf(req.body.departmentName)
        fac.departmentName.splice(indx,1);
        await fac.save();
        console.log("department deleted successfuly")
        res.send("the department deleted!");}
        else{
            res.send("the department you want to delete does not exist")
        }
    }
    else{
        res.send('the faculty you want to delete a department from it doesnt exist')
    }}
    // else{
    //     res.send("this route for hr only")
    // }}
    
    catch(error){
        res.status(500).json({error:error.message});
    }  
})
router.route('/courseAffairs')
.post(async(req,res)=>{
 try  
     {
        //      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
        //  if(mem.department=="hr")
          const dep= await courseDep.findOne({"departmentName":req.body.departmentName});
     if(dep!=null){
         console.log("department that you want found !")
         dep.courseName.push(req.body.courseName)
         await dep.save();
         const cours=new course({
            courseName:req.body.courseName 
         }) 
         await cours.save()
         const covr=new coverage({
             department:req.body.departmentName,
             course:req.body.courseName
         })
         await covr.save()
        
        
         res.send("course inserted !")
     }
     else{
         res.send('there is no such a department')
     }}
//    else{
//        res.send("this route for hr only ")
//    }
    catch(error){
    res.status(500).json({error:error.message});
} 
 })
 .put(async (req,res)=>{
     
     try   { 
        
            //      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
            //  if(mem.department=="hr")
         {const dep=await courseDep.findOne({"departmentName":req.body.departmentName})
         if(dep!=null){
             if(dep.courseName.includes(req.body.courseName)){
             const indx=dep.courseName.indexOf(req.body.courseName) 
             dep.courseName.splice(indx,1,req.body.courseName2)
             await dep.save();
             const cors= await course.findOneAndUpdate({"courseName":req.body.courseName},{"courseName":req.body.courseName2},{new:true})
             const cvr=await coverage.findOneAndUpdate({"course":req.body.courseName},{"course":req.body.courseName},{new:true})
             console.log("course updated successfuly")
             res.send("course updated !");}
             else{
                 res.send("the course you want to update does not exist")
             }
         }
         else{
             res.send('the department you want to update a course from it doesnt exist')
         }}
        // else{
        //     res.send("this route for hr only")
        // }
    }
         catch(error){
            res.status(500).json({error:error.message});
        } 
         
       
 })
 router.route('/deleteCourse')
 .post(async(req,res)=>{
  try {
    
        //      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
        //  if(mem.department=="hr")
    {const dep=await courseDep.findOne({"departmentName":req.body.departmentName})
    if(dep!=null){
        if(dep.courseName.includes(req.body.courseName)){
        const indx=dep.courseName.indexOf(req.body.courseName) 
        dep.courseName.splice(indx,1)
        await dep.save();
        const crs=await course.findOneAndDelete({"courseName":req.body.courseName})
        const cvr= await coverage.findOneAndDelete({"courseName":req.body.courseName})
        console.log("course deleted successfuly")
        res.send("course deleted!");}
        else{
            res.send("the course you want to delete does not exist")
        }
    }
    else{
        res.send('the department you want to delete a course from it doesnt exist')
    }}}
// else{
//     res.send("this route for hr only")
// }}
    catch(error){
        res.status(500).json({error:error.message});
    } 
    
     
     
 })
 router.route('/staffAffairs')
 .get(async(req,res)=>{
     res.send("msh 3arfa a3ml eh")
 })
 .post(async(req,res)=>{
    try{
        //      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
        //  if(mem.department=="hr")
        {
            let {office,email,department,salary,name}=req.body
        // if(!email)
        // res.send("no email")
     if(!office||!email||!department||!salary||!name){
         res.send("please enter unique email,name,salary,office,department")
     }
      const locdata=await location.findOne({"location":req.body.office})
     // const mail=await staffMembers.findOne({"email":req.body.email})
     ////default academic member
     let bolloc=false;
      let idtype="";
      let rol=""
      let dayoff=["friday"]
      if(locdata!=null){
       if(locdata.remainingPlaces>0){
           bolloc=true
           console.log("the place found and there is enough capacity ")
           const locnewcap=await location.findOneAndUpdate({"location":req.body.office},{"remainingPlaces":locdata.remainingPlaces-1},{new:true})
        }
        else{
            res.send("the office is full ,please re-enter your data")
        }   
    }
    else{
        res.send("there is no such a location ,please re-enetr your data ")
    }
    if(req.body.department=="hr"){
        idtype="hr-"
        dayoff.push("saturday")
        let last=staffIDs[0].id.length+1
        staffIDs[0].id.push(1)

        idtype+=last
        
    }
    else{
        idtype="ac-"
         rol="academicMember"
        let last=staffIDs[1].id.length+1
        staffIDs[1].id.push(1)
        idtype+=last
    }
    if(bolloc){
    const staff=new staffMembers({
        name:req.body.name,
        email:req.body.email,
        id:idtype,
        officeLocation:req.body.office,
        salary:req.body.salary,
        daysOff:dayoff,
        department:req.body.department,
        role:rol
}) 
      await staff.save();
      res.send("staff inserted !")
      console.log("staff inserted , congrats !")
} }
// else{
//     res.send("this route for hr only")
// }
}
catch(error){
    res.status(500).json({error:error.message});
} 
 }
 )
 .put(async (req,res)=>{
     try {
        
            //      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
            //  if(mem.department=="hr")
         {const staff=await staffMembers.findOneAndUpdate({"id":req.body.id},req.body,{new:true})
      if(staff!=null){
         res.send("staff updated !")
         console.log("staff member updated successfully !")
      }
      else{
          res.send("the employee you are tring to update doesnot exist !")
      }}
    // else{
    //     res.send("this route for hr only")
    // }
}
      catch(error){
        res.status(500).json({error:error.message});
    } 
 } )
 router.route('/deleteStaffMember')
 .post(async(req,res)=>{
     try { 
        
            //      const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
            //  if(mem.department=="hr")
          
            let id=req.body.id
           
          {const staff= await staffMembers.findOne({"id":id});
        if(staff!=null){
        const loc =await location.findOne({"location":staff.officeLocation})
        await location.findOneAndUpdate({"location":loc.location},{"remainingPlaces":loc.remainingPlaces+1},{new:true})
        await staffMembers.findOneAndDelete({"id":id})
        res.send("the staff member deleted successfully !")}
        else{
            res.send('there is no staff with this id !')
        }}
    // else{
    //     res.send("this route for hr only")
    // }
}
        catch(error){
            res.status(500).json({error:error.message});
        }
 })
 router.route('/updateSalary')
.put(async (req,res)=>{
  try {
//       const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
//   if(mem.department=="hr")
       {if(req.body.id==null || req.body.newSalary==null){
        res.send("please enter id and newSalary ")
    }else{
    const staff=await staffMembers.findOneAndUpdate({"id":req.body.id},{"salary":req.body.newSalary},{new:true})

    if(staff!=null){
    res.send("salary updated !")}
    else{
        res.send("no staff member with the entered ID !")
    }}}
// else{
//     res.send("this route for hr only")
// }
}
    catch(error){
        res.status(500).json({error:error.message});
    }

})
router.route('/addMissingSign')
.put(async(req,res)=>{
   try{
//        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
//    if(mem.department=="hr")
    //    { if(mem.id==req.body.id){
    //     res.send("you can not add missing sign in or out for yourself")
    // }else{
        console.log(req.body)
           if(req.body.id==null||req.body.date==null){
        res.send("please enter id and date to update the record")
    }
    const att=await attendance.findOne({"id":req.body.id,"date":req.body.date})
    if(att!=null){
        if(req.body.checkOut!=null){
            if(att.checkOut!=null){
                res.send("the checkOut time already exists")
            }
            else{
                await attendance.findOneAndUpdate({"id":req.body.id,"date":req.body.date},{"checkOut":req.body.checkOut},{new:true})
                res.send("checkout added!")
            }
        }
        if(req.body.checkIn!=null){
            if(att.checkIn!=null){
                res.send("the checkIn time already exists")
            }
            else{
                await attendance.findOneAndUpdate({"id":req.body.id,"date":req.body.date},{"checkIn":req.body.checkOut},{new:true})
                res.send("checkIn added!")
            }
        }
    }
    else{
        res.send("there is no attendence for the entered infos !")
    }}
    //}
// else{
//     res.send("this route for hr only")
// }
//}
    catch(error){
        res.status(500).json({error:error.message});
    }
})
router.route('/viewAtttendanceRecord')
.post(async(req,res)=>{
  try {
//       const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
//   if(mem.department=="hr")
 console.log(req.body.memberID)
       {await attendance.find({"id":req.body.memberID},function(err,docs){
        if(docs.length>0){
            console.log(docs)
            res.send(docs)
        }
        else{
            res.send("no attendance record forthe entered ID")
        }
        if(err){
            res.send(err)
        }

    })}
// else{
//     res.send("this route for hr only")
// }
}
    catch(error){
        res.status(500).json({error:error.message});
    }
})
router.route('/viewMissingHoursOrDays')
.post(async(req,res)=>{
   try {
//        const mem=jwt.decode(req.header('auth-token'),process.env.JWT_KEY)
//    if(mem.department=="hr")
       {
       console.log("here")
           const staff=await staffMembers.findOne({"id":req.body.id})
    //res.send(staff)
    if(staff!=null)
    {if(req.body.type=="hours"){
    let finl=""
    const missingHours=168-staff.hours
    if(missingHours<0){
       finl="your extra hours : "
       finl+=missingHours*-1
    }
    else{
        finl="your missong hours : "
        finl+=missingHours
    }
    res.send(finl)
   }
    if(req.body.type=="days"){
        const nowdate=new Date()
        
        let nowday=nowdate.getDate()
        let nowmonth=nowdate.getMonth()
        let nowyear=nowdate.getFullYear()
        let missedday=[]
        let monthstart=nowmonth
        let yearstart=nowyear
        let dayof=[6]
        const dayoff2=staff.daysOff.pop()
        if(dayoff2=="saturday")
           dayof.push(0)
        if(dayoff2=="sunday") 
        dayof.push(1)  
        if(dayoff2=="moday")
        dayof.push(2)
        if(dayoff2=="tuesday")
        dayof.push(3)
        if(dayoff2=="wensday")
        dayof.push(4)
        if(dayoff2=="thursday")
        dayof.push(5)
        if(nowday<=10){
            nowday+=30
            if(monthstart==0){
               yearstart-=1
               monthstart=11
            }
            else{
                monthstart-=1
            }

        }
        let datloop=1
        for (let startday = 11; startday <=nowday; startday++) {
            if(startday>30){
                startday=datloop
                datloop+=1
            }
             let ttoday=new Date()
             //yearstart-monthstart-startday
             ttoday.setDate(startday)
             ttoday.setMonth(monthstart)
             ttoday.setFullYear(yearstart)
            const element = await attendance.findOne({"id":staff.id,"date":ttoday})
            if(element==null){
                missedday.push(ttoday)
            }
            
        }
        let missdayfinal=[]
        for(let i=0;i<missedday.length;i++){
             if(missedday[i].getDay()!=6&&missedday[i]!=dayof[1]){
                 missdayfinal.push(missedday[i])
             }
        }
        console.log(missdayfinal)
        res.send(missdayfinal)
    }
    else{
        res.send("please enter days or hours")
    }}
    else{
        res.send("there is no staff with this id")
    }}
// else{
//     res.send("this route for hr only ")
// }
}
    catch(error){
        res.status(500).json({error:error.message});
    }
})
module.exports=router

