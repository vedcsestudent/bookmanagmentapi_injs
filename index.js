const express = require("express");
const urouter=require("./routes/users");
const brouter = require("./routes/books");//books data
const dotenv=require("dotenv");
const dbconnection=require("./dbconnection");
const app = new express();

dotenv.config();

//calling database connection i.e establishing database connection
dbconnection();
//home route
app.use(express.json());
//userroute
app.use("/users",urouter);
//book route
 
//dispalying all books
app.use("/books",brouter);

app.listen(3000, () => {
    console.log("server is live");
})