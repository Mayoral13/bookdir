const router = require("express").Router();
let bookdir = require("./books");
let books = bookdir;
//TO GET ALL BOOKS
router.get("/books",(req,res)=>{
    res.send(books);
});
//TO SEND A SPECIFIC BOOK
router.get("/books/:id",(req,res)=>{
    const {id} = req.params;
    const book = bookdir.find(b => b.isbn == id);
    if(book){
        res.send(book);
    }else res.send("BOOK DOES NOT EXIST").status(404);
});
//TO CREATE A BOOK 
router.post("/books",(req,res)=>{
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;
    const book = bookdir.find(b => b.isbn == isbn);
    if(book){
        res.send("BOOK EXISTS");
    }
    const mybook = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    };
    bookdir.push(mybook);
    res.send(mybook);
});
//TO DELETE A BOOK 
router.delete("/books/:id",(req,res)=>{
    const{id} = req.params;
    const book = bookdir.find(b =>b.isbn == id);
    if(!book){
        res.send("BOOK DOES NOT EXIST");
    }
    bookdir = bookdir.filter(b => b.isbn !== id);
    res.send("SUCCESS");
});
//TO UPDATE A BOOK
router.put("/books/:id",(req,res)=>{
    const {id} = req.params;
    const book = bookdir.find(b =>b.isbn == id);
    if(!book){
        res.send("BOOK DOES NOT EXIST");
    }
    const {
        title

    } = req.body;
    const Update = (val, prev) => !val ? prev : val;
    const Updated = {
        ...book,
        title:Update(title,book.title)
    };
    const bookIndex = bookdir.findIndex(b => b.isbn == id);
    bookdir.splice(bookIndex,1,Updated);
    res.send(Updated);

})
module.exports = router;