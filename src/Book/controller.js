
const pool = require('../../db')
const queries = require('./queries')

// Function to get all books in the system
const getBooks = (req, res) => {
    pool.query(queries.getBooks, (error, results)=>{
        if (error) throw error ;
        res.status(200).json(results.rows) ;
    })
};

// Function to get a book with a certain ISBN 
const getBookByISBN = (req, res)=>{
    const isbn = parseInt(req.params.isbn);
    pool.query(queries.getBookByISBN, [isbn], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows) ;
    })
}

// Function to add a new book to the system
const addBook = (req, res) => {
    const { isbn, title, author, quantity, location } = req.body;
    // Check if the book already exists (by the ISBN)
    pool.query(queries.checkBookExists, [isbn], (error, results) => {
        if(results.rows.length){
            res.send("This book already exists!");
        }
        else{
            // If it doesn't already exist, add it to the system
            pool.query(queries.addBook, [isbn, title, author, quantity, location], (error, results) => {
                if (error) throw error;
                res.status(201).send("Book added successfully!");
            })
        }

    })
}

// Function to delete a book from the system using its isbn
const deleteBook = (req, res) => {
    const { isbn } = req.body;
    pool.query(queries.getBookByISBN, [isbn], (error, results) => {
        const noBooksFound = !results.rows.length ;
        // Check if the book doesn't exist in the system
        if(noBooksFound){
            res.send("This book doesn't exist in the database !");
        }
        else{
            // If it exists, then delete it
            pool.query(queries.checkBook, [isbn], (error, results) => {
                if(error) throw error;
                if(results.rows.length){
                    pool.query(queries.deleteBFromBorrowingDetails, [isbn], (error, results) => {
                        if (error) throw error;
                    })
                }
            })
            pool.query(queries.deleteBook, [isbn], (error, results) => {
                if (error) throw error;
                res.status(200).send("Book removed successfully");
            })
        }
    })
}

// Function to update book info using its isbn
const updateBook = (req, res) => {
    const { isbn, title, author, quantity, location } = req.body;
    pool.query(queries.getBookByISBN, [isbn], (error, results) => {
        const noBooksFound = !results.rows.length ;
        // Check if book doesn't exist in the system 
        if(noBooksFound){
            res.send("This book doesn't exist in the database !");
        }
        else{
            // If it exists, then update it
            pool.query(queries.updateBook, [isbn, title, author, quantity, location], (error, results) => {
                if (error) throw error;
                res.status(200).send("Book updated successfully");
            })
        }
    })
}

module.exports = {
    getBooks,
    getBookByISBN,
    addBook, 
    deleteBook,
    updateBook,
};
