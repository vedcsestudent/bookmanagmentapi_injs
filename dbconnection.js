const mongoose=require("mongoose");
const dbconnection=()=>{
  const db_url=process.env.Mongo_url;
  mongoose.connect(db_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true

  });//this method connect the database with the application
  const db=mongoose.connection;
  db.on("error",console.error.bind("connection error"));
  db.once("open",function(){
    console.log("db connected")
  })
}
module.exports=dbconnection