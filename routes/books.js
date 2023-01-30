const express=require("express");
const{getAllBooks, getSingleBook, getAllIssuedBook, addNewBook, updateSingleBook,deleteSingle}=require("../controllers/bookcontroller")
const {users}=require("../data/users.json");
const {books}=require("../data/books");
const { deleteSingleBook } = require("../controllers/bookcontroller");
//calling databases

const router=express.Router();
//book route

//dispalying all books

/*router.get("/", (req, res) => {
    res.status(200).json({ success: "true", "books": books });
})*/
router.get("/",getAllBooks);

//add new book
/*router.post("/",(req,res)=>{
    const {name,author,genre ,price,publisher}=req.body;
    
    if(book)
    {
        return res.status(404).json({"message":"this book is already present in the liabrary"})
    }
    books.push({id,name,author,genre,price,publisher});
    return res.status(200).json({success:"true",data:books});
})*/
router.post("/",addNewBook);
//removing a book
router.delete("/:id",deleteSingleBook)
/*issued book
route books/issued
paramas none
description use both user and books data 
access public
*/
/*
const issued_books=[];
router.get("/issued",(req,res)=>{
    const user_with_book=users.filter((each)=>{if(each.issuedBook) return each})
    user_with_book.forEach((each)=>{
        const book=books.find((item)=>{if(item.id===each.issuedBook)return item})
        book.issuedTo=each.id;
        book.issuedDate=each.issuedDate;
        book.returnDate=each.returnDate;
        issued_books.push(book);
       
    })
    if(issued_books.length==0)
    {
        return res.status(404).json({"message": "no book is issued"})
    }
    res.status(200).json({success:"true",data:issued_books})
})*/
router.get("/issued",getAllIssuedBook);
//working with individual book

//showing single book 
//url books/:id

/*router.get("/:id", (req, res) => {
    const { id } = req.params;
    const data=books.find((each)=>{if(each.id==id) return each})
    if (!data) {
      return  res.status(404).json({ success: "false", bookinfo: "no book found " });

    }
 return   res.status(200).json({
        success: "true",
        "bookinfo": data
    });
});*/
router.get("/:id",getSingleBook);
/* update book
url books/:id
params: id
description: updating book info
access specifier :public
*/
router.put("/:id",updateSingleBook)
//books issued with fine
//url books/issued/fine
//method get
//parameter none
//access private
/*const issuedwithfine=[];
router.get("/issued/fine",issuedWithFine)*/

module.exports=router;
