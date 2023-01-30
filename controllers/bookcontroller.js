const IssuedBook = require("../dto/bookdto");
const {bookmodal, usermodal}=require("../modals/index");
//getAllBook
exports.getAllBooks= async (req,res)=>{
    const books= await bookmodal.find();
    if(books.length===0)
    return res.status(404).json({status:"false",message:" no book is present in bookmodal"})
    res.status(200).json({status:"true",data:books})
}
//insert new book
exports.addNewBook= async (req,res)=>{
    const {data}=req.body;
    if(!data)
    {
        return res.status(404).json({status:"false",message:"no book details were enterred"})
    }
    await bookmodal.create(data);
    const books=await bookmodal.find();
    res.status(200).json({status:"true",details:books});
}
//get individual book
exports.getSingleBook= async(req,res)=>{
    const {id}= req.params;
    const book= await bookmodal.find({_id:id});
    if(!book)
    {
        return res.status(404).json({status:"false",details:"no book was find with given id"})
    }
    res.status(200).json({status:"true",details:book});
}
//update single book
exports.updateSingleBook= async (req,res)=>{
    const {id}=req.params;
    const {data}= req.body;
    if(!data)
    return res.status(404).json({status:"false", detail:" no data is given for updation"});
   const user= await bookmodal.findOneAndUpdate({_id:id},data,{new:true});
   res.status(200).json({success:"true",info:user});
}
//delete single user
exports.deleteSingleBook= async (req,res)=>{
    const{id}= req.params;
    const book=await bookmodal.find({_id:id});
    if(!book)
    return  res.status(404).json({success:"false",message:"the book with specified id is not present therefore deltetion could not be perform"})
     bookmodal.findOneAndDelete({_id:id},(err,doc)=>{
        if(err)
        console.log(err);
        else
      { console.log(doc);
        console.log(err)
        res.status(200).json({success:true,data:doc})} 
    })
}
//get all issued book
exports.getAllIssuedBook=async (req,res)=>
{
const issued_book= await bookmodal.find({issuedBook:{$exist:true}});
if(issued_book.length===0)
return res.status(404).json({success:"false",data:" no book is issued"});
 const issued= issued_book.map((each)=>{
    new IssuedBook(each);
})
return res.status(200).json({success:"true", data:issued})
}