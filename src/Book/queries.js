const getBooks = "SELECT * FROM books";
const getBookByISBN = "SELECT * FROM books WHERE ISBN = $1";
const checkBookExists = "SELECT b FROM books b WHERE b.isbn = $1";
const addBook = "INSERT INTO books (isbn, title, author, quantity, location) VALUES ($1, $2, $3, $4, $5)" ;
const deleteBook = "DELETE FROM books WHERE ISBN = $1";
const updateBook = "UPDATE books SET title=$2, author=$3, quantity=$4, location=$5 WHERE isbn = $1";

module.exports = {
    getBooks,
    getBookByISBN,
    checkBookExists,
    addBook,
    deleteBook,
    updateBook,
}