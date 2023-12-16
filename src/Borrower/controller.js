const send = require('send');
const pool = require('../../db')
const queries = require('./queries')

// Function to get info of the borrower/user
const getBorrowerInfo = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getBorrowerInfo, [id], (error, results) => {
        if (error) throw error ;
        res.status(200).json(results.rows);
    })
}

// Function to get all books borrowed by current user using user's id
const getBooksBorrowed = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBooksBorrowed, [id], (error, results) => {
        if (error) throw error;
        if(!results.rows.length){
            res.send("No books borrowed by you");
        }
        else{
            res.status(200).json(results.rows);
        }
    })
}

// Function handling borrowing a book by current user
const borrowBook = (req, res) => {
    const id = parseInt(req.params.id);
    const { isbn } = req.body;

    // Get quantity of book that the user wants to borrow -> if 0 send unavailable
    pool.query(queries.getCountBook, [isbn], (error, results) => {
        if (error) throw error ;
        if(results.rows[0]['quantity']==0){
            res.send("This book is currently unavailable !");
        }
        else{
            // Check if this user has already borrowed that book (and is CURRENTLY borrowed by the user)
            pool.query(queries.checkBorrowerAndBook, [id, isbn], (error, results) => {
                if(results.rows.length){
                    res.send("You've already borrowed this book !");
                }
                else{
                    pool.query(queries.addBorrowerAndBook, [isbn, id], (error, results) => {
                        if (error) throw error;
                        res.status(201).send("Book borrowed successfully ");
                    })
                    pool.query(queries.decrementCountBooks, [isbn], (error, results) => {
                        if (error) throw error;
                    })
                }
            })
        }
    })
}

// Function handling returning of a book by current user
const returnBook = (req, res) => {
    const id = parseInt(req.params.id);
    const { isbn } = req.body;
    let bookExists = false;

    pool.query(queries.getBooksBorrowed, [id], (error, results) => {
        for (let i = 0; i < results.rows.length; i++) {
                if(results.rows[i]['isbn'] == isbn){
                    bookExists = true;
                    break;
                }
          }
          if(bookExists){
            // Return book by deleting it from the borrowingdetails table
            pool.query(queries.returnBook, [id, isbn], (error, results) => {
                if (error) return error ;
                res.status(200).send("Book returned successfully");
            })
            // Also, increment the book's quantity in the system by 1
            pool.query(queries.incrementCountBooks, [isbn], (error, results) => {
                if (error) return error ;
            })
          }
          else{
                res.send("Failed! This book doesn't belong to the ones borrowed by you !");
          }
    })
}

// Function to get all the books in the system
const getAllBooks = (req, res) => {
    pool.query(queries.getAllBooks, (error, results) => {
        if (error) throw error ;
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getBorrowerInfo,
    getBooksBorrowed,
    borrowBook,
    returnBook,
    getAllBooks,
};