const getBorrowerInfo = "SELECT * FROM borrowers WHERE ID = $1";
const getBooksBorrowed = "SELECT ISBN, Title, Author FROM books WHERE ISBN in ( SELECT ISBN FROM borrowingdetails WHERE ID = $1)";
const getCountBook = "SELECT quantity FROM books WHERE ISBN = $1";
const checkBorrowerAndBook = "SELECT * FROM borrowingdetails WHERE ID = $1 AND ISBN=$2 ";
const addBorrowerAndBook = "INSERT INTO borrowingdetails (ISBN, ID) VALUES ($1, $2)";
const decrementCountBooks = "UPDATE books SET quantity = quantity-1 WHERE ISBN = $1 AND quantity>0";
const returnBook = "DELETE FROM borrowingdetails WHERE ID=$1 AND ISBN=$2";
const incrementCountBooks = "UPDATE books SET quantity = quantity + 1 WHERE ISBN = $1";
const getAllBooks = "SELECT ISBN, Title, Author FROM books";

module.exports = {
    getBorrowerInfo,
    getBooksBorrowed,
    getCountBook,
    checkBorrowerAndBook,
    addBorrowerAndBook,
    decrementCountBooks,
    returnBook,
    incrementCountBooks,
    getAllBooks,
}
