const {bookmodal, usermodal}=require("../modals/index");
//get all users
exports.getAllUser=async (req,res)=>{
    const user= await usermodal.find();
    if(user.length===0)
    return res.status(404).json({success:"false", message:"no user to display"});
    return res.status(200).json({success:"true",data:user});

}
//add new user
exports.addUser= async(req,res)=>{
    const {data}=req.body;
    if(!data)
    {
        return res.status(404).json({success:"false",message:"no detail is supplied to put on db"});
    }
    await usermodal.create(data);
    const users=await usermodal.find();
    res.status(200).json({success:"true", info: users});
}
// get single user
exports.getSingleUser= async (req,res)=>{
    const {id}= req.params;
    const user= await usermodal.find({_id:id})
    if(!user)
    {
        return res.status(404).json({success:"false",message:"no user exist with specified id"});
    }
    res.status(200).json({success:"true",info:user})
}
//update user info
exports.updateSingleUser=async (req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    console.log(data);
    if(!data)
    {
        return res.status(404).json({success:"false", message:" no data was given for updation of user"});
    }
    const updated_user=await usermodal.findOneAndUpdate({_id:id},data,{new:true});
    let uuser=await usermodal.find({_id:id})
    uuser=data;
    res.status(200).json({success:"true", info:uuser});
}
//delete single user
exports.deleteSingleUser=  (req,res)=>{
    const {id}= req.params;

     usermodal.findOneAndDelete({_id:id}, async(data,error)=>{
        if(error)
        {
            console.log("error");  
            return res.status(404).json({success:"false",message:"no user exist for deletion"})
        }
        else
        { let d;
           
            console.log(data);
            return res.status(200).json({success:"true",info:data})
        }
    })
}
//getsubscriptiondetail
exports.getSubscriptionDetail= async (req,res)=>{
    const {id}=req.params;
    const user= await usermodal.find({_id:id});
    if(!user)
    return res.status(404).json({status:"false",message:"no user exist that's why no detail were obtained"})
    const getdateIndays=(data="")=>
    {
        let date;
        if(data==="")
        date= new Date();
        else
        date= new Date(data);
         date= Math.floor(date/(1000*60*60*24))
         return date;
    }
    const getSubscription= (date)=>
    {
        if(user.subscriptionType==="Basic")
        date+=30;
        else if( user.subscriptionType==="standard")
        {
            date+=90;
        }
        else
        {
            date+=360;
        }
        return  date;
    }
    const returndate= getdateIndays(user.returnDate);
    const currentdate=getdateIndays();
    const subscriptiondate=getdateIndays(user.subscriptionDate);
    const subscriptionexpiration=getSubscription(subscriptiondate);
    const info={...user,subscriptionExpiration:currentdate>subscriptionexpiration,noofdays:currentdate>returndate?0:returndate-currentdate,fine:currentdate>returndate?subscriptiondate<currentdate?200:100:0};
    res.status(200).json({status:"success",data:info});
}