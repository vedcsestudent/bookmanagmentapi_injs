const express= require("express");
const {users}=require("../data/users.json");
const {getAllUser,getSingleUser, deleteSingleUser,updateSingleUser, addUser, getSubscriptionDetail}=require("../controllers/usercontroller");
//db modal
const {
    bookmodal,usermodal
}=require("../modals/index");

const router=express.Router();
//user route
//getting all the users
//res.status(200).json({success:true,data:user}) with normal js
router.get("/",getAllUser);
//adding new user
/*router.post("/", (req, res) => {
    const { id, name, surname, email, issueDate, returnDate, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => { if (each.id === id) return each })
    if (user) {
        res.status(404).json({
            success: "false",
            message: "user already exist"
        })
    }
    else {
        users.push({ id, name, surname, email, issueDate, returnDate, subscriptionType, subscriptionDate });
        res.status(200).json({ success: "true", "users": users });
    }

});
*/
router.post("/",addUser );
//working with specific user
 
//getting specific user by get /user/:id

/*router.get("/:id", (req, res) => {
    const { id } = req.params;

    const user = users.find((each) => { if (each.id == id) return each; })
    if (!user) {
        res.status(404).json({ success: "false", message: "user doesnot exist" })
    }
    else {
        res.status(200).json({ success: "true", userdata: user })


    }
})*/
router.get("/:id",getSingleUser)

//updating user putuser/:id
/*router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => { if (each.id === id) return each })
    if (!user) {
       return res.status(404).json({ "success": "false", message: "user does not exist" })
    }
   
        
        const updateduser = users.map((each) => {
            if (each.id === id) {
                return {
                    ...each,
                 ...data
                }
            }
            else {
                return each;
            }
        })
       return res.status(200).json({ success: "false", users: updateduser })
    
});
*/
router.put("/:id",updateSingleUser);
//deleting a user 
/*
method delete
paramater id
description deleting the user
path /user/:id*/

/*router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>{
        if(each.id===id)
        {
            return each;
        }
    })
    if(!user)
    {
        return res.status(404).json({"success":"false","message":"no user exist for deltion"})

    }
    const index=users.indexOf(user);
    users.splice(index,1);
    return res.status(202).json({"success":"true",data:users});
})*/
router.delete("/:id",deleteSingleUser)
/*
it will tell the subscription detail of a specific usdr
param id
path user/subscription/:id
access public
*/
/*router.get("/subscription/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>{if(each.id===id) {return each}})
    if(!user)
    {
        return res.status(404).json({"message" :"no user exist so no subscription could be obtain"})
    }
    const getdateIndays=(data="")=>{
        let date;
        if(data==="")
        {
            date= new Date();//when no date is applied we will take the current date
        }
        else
        {
            date= new Date(data);
        }
        date=Math.floor(date/(1000*60*60*24))//here the actual date willget divide by days to obtain days in js floor can work with string as well
        return date;
    }
    const getsubscription=(date)=>
    {
        if(user.subscriptionType==="Basic")
        {
            date+=30;
        }
        else if(user.subscriptionType==="standard")
        date+=60;
        else
        date+=360;
        return date;
    }
    const returndate=getdateIndays(users.returnDate);
    const currentdate=getdateIndays();
    const subscriptionDate=getdateIndays(users.subscriptionDate);
    const subscriptionexpiration=getsubscription(subscriptionDate);
    const data= 
    {...user,subscriptionexpired:currentdate>subscriptionexpiration,
        noofleftdays:currentdate>=subscriptionexpiration?0:subscriptionexpiration-currentdate,
        fine:currentdate>returndate?currentdate>=subscriptionexpiration?200:100:0
    }
    res.status(200).json({"success":"true","data":data})


})*/
router.get("/subscription/:id",getSubscriptionDetail);

module.exports=router;
