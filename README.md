# LibraryManagementSystem-Backend
Simple Implementation of backend logic behind library management system using NodeJS and PostgreSQL.

Notes (NodeJs):
- Open LibrarySystem folder in vscode
- Open a new terminal inside the folder and write:
  1) npm install
  2) node server.js
- Test queries using browser or postman --> http://localhost:3000

Notes (PostgreSQL):
- Write the SQL commands in the postgres shell
- The DB script is provided in DB_script.sql file, but note that after writing the first statement **CREATE DATABASE library;** you should type **\c library** in the postgres shell to be able to add the tables **inside the library database** then you can copy the remaining code in the file and paste it in the postgres shell.
- The DB scehma was generated using Luna Modeler
- The database contains three different tables: Books, Borrowers and Borrowing Details
- In the DB.js file, the following block of code should be replaced with one that matches your configuration:
  const pool = new Pool({
   user: [your user name which is postgres by default],
   host: "localhost",
    database: [your database name],
    password: [your postgres password set while installing it],
    port: 5432
     });
- You can check your configuration info by typing this command in the postgres shell : **\conninfo**

Notes (Routes):
- The routes were designed to support a full working system (frontend with backend) although I didn't have the time to implement the frontend part
  
- http://localhost:3000/api                                 Home Page (Login - Signup)
- http://localhost:3000/api/admin                           Home page for admin (Books - Borrowers)
- http://localhost:3000/api/user/:id                        Home page for user (Showing info of the user)
  
- http://localhost:3000/api/admin/books                     Page that contains list of all books in the system where each book has option delete. Additionally, there are 2                                                                      functionalities; update and add
- http://localhost:3000/api/admin/books/add                 The page that the admin navigates to after clicking add option in books page.
- http://localhost:3000/api/admin/books/update              The page that the admin navigates to after clicking update option in books page.
- http://localhost:3000/api/admin/books/:isbn               The page that the admin navigates to after clicking on a certain book (or search for it by isbn)
  
- http://localhost:3000/api/admin/borrowers                 Page that contains list of all borrowers in the system where each borrower has option delete. Additionally, there are 2                                                              functionalities; update and add
- http://localhost:3000/api/admin/borrowers/add             The page that the admin navigates to after clicking add option in borrowers page.
- http://localhost:3000/api/admin/borrowers/update          The page that the admin navigates to after clicking update option in borrowers page.
- http://localhost:3000/api/admin/borrowers/:id             The page that the admin navigates to after clicking on a certain borrower (or search for it by id)

- http://localhost:3000/api/user/:id/allbooks               The page that the user navigates to after clicking on ShowAllBooks, this page shows all the books available in the                                                                   library
- http://localhost:3000/api/user/:id/allbooks/borrow        The page that the user navigates to after clickin on BorrowBook, this page handles new book borrowing
- http://localhost:3000/api/user/:id/mybooks                The page that the user navigates to after clicking on ShowMyBooks, this page shows all books currently borrowed by the                                                               user
- http://localhost:3000/api/user/:id/mybooks/return         The page that the user navigates to after clicking on ReturnBook, this page handles returning an already borrowed book


Notes (Testing using postman):

ADMIN:
- ADDING BOOK 
url: http://localhost:3000/api/admin/books/add, method: POST
- LISTING BOOKS 
url: http://localhost:3000/api/admin/books, method: GET
- UPDATING BOOK 
url: http://localhost:3000/api/admin/books/update, method: PUT (isbn of book to be updated should be provided in the request body)
- GETTING BOOK BY ISBN 
url: http://localhost:3000/api/admin/books/3, method: GET (should get book with ISBN 3)
- DELETE BOOK 
url: http://localhost:3000/api/admin/books, method: DELETE (isbn of book to be deleted should be provided in the request body)
- ADDING/REGESTERING BORROWER
url: http://localhost:3000/api/admin/borrowers/add, method: POST
- LSITING BORROWERS 
url: http://localhost:3000/api/admin/borrowers, method: GET
- UPDATING BORROWER 
url: http://localhost:3000/api/admin/borrowers/update, method: PUT (id of book to be updated should be provided in the request body)
- GETTING BORROWER BY ID 
url: http://localhost:3000/api/admin/borrowers/:id, method: GET
- DELETE BORROWER
url: http://localhost:3000/api/admin/borrowers, method: DELETE (id of book to be deleted should be provided in the request body)

USER:
- SHOWING INFO 
url: http://localhost:3000/api/user/:id, method: GET
- SHOWING ALL BOOKS 
url: http://localhost:3000/api/user/:id/allbooks, method: GET
- SHOWING BORROWED BOOKS BY USER 
url: http://localhost:3000/api/user/:id/mybooks, method: GET
- BORROW BOOK 
url: http://localhost:3000/api/user/:id/allbooks/borrow, method: POST (isbn of book to be borrowed should be provided in the request body)
- RETURN BOOK 
url: http://localhost:3000/api/user/:id/mybooks/return, method: PUT (isbn of book to be returned should be provided in the request body)


Notes (Validations):
- Upon successful Adding/Removing/Updating of data, a message is sent to confirm that.
- The following cases are handled whith showing message to user indicating the error:
--> Deleting book/borrower that doesn't exist in the system
--> Updating book/borrower that doesn't exist in the system
--> Adding book with same isbn as a book already existing in the system
--> Adding borrower with the same id as a borrower already existing in the system
--> Adding a new user but with an email that already exists in the system
--> Borrowing a book that is existing but with quantity 0
--> Borrowing a book that is already currently borrowed by the user
--> Returning a book with isbn that doesn't belong to the borrowed books


Notes (Queries):
Provided below are the query names used in the code and their explanation :
- getBooks : get all books in the system
- getBookByISBN : get certain book with the provided isbn
- addBook : adds a new book to the system 
- deleteBook : deletes a book from the system
- updateBook : updates information of a certain book using its isbn
  
- getBorrowerInfo : get information of a certain user (using id param provided in the url)
- getBooksBorrowed : get all books borrowed by a certain user
- getCountBook : get the quantity of a certain book using its isbn
- checkBorrowerAndBook : get the row containing certain user id with a certain book isbn (used in validating that the user should not borrow tha same book more than once)
- addBorrowerAndBook : add the id of a certain user and the isbn of the book borrowed by that user to the borrowingdetails table
- decrementCountBooks : decrement the count/quantity of a certain book by 1 using its isbn (used when a user borrows a certain book, its count in the library decreases by 1, while                          handling that it doesn't decrement below zero)
- returnBook : delete the row with a specific user id and a specific book isbn from borrowingdetails table
- incrementCountBooks : increases the count/quantity of a certain book by 1 using its isbn (used when a user returns a book, its count in the library increases by 1)
  
- getBorrowers : get all borrowers in the system
- getBorrowerByID : get borrower with a certain id
- checkEmailExists : select from borrowers table the row with the provided email (used in validation that email should be unique for each user)
- addBorrower : add new user to the system
- deleteBorrower : delete user with a certain id from the system
- updateBorrower : update information of a certain user using id

Notes (Code Structure):
- src/Book           :   responsible for the logic of modifying/updating/deleting books by ADMIN
- src/Borrower_Admin :   responsible for the logic of modifying/updating/deleting borrowers by ADMIN
- src/Borrower       :   responsible for the logic of borrowing/returning/viewing books by USER

Notes (Some Test Cases):
- There is a book in the database with quantity 1, let any user borrow it and then get all books again to observe quantity decreases
- Try afterwards to make a user borrow that book (now with quantity zero) to observe that it will print that the book is currently unavailable and won't decrement below zero
- Also, observe the book now present in mybooks of the user
- Try adding a book with the same isbn as one existing in the database
- Do the same for borrowers but with same ID
- On returning a book, observe its quantity increasing, and check that it is not present now in mybooks of the user
- Try to delete a borrower or a book that is not existing in the database
