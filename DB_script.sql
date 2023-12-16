CREATE DATABASE Library;

\c Library

CREATE TABLE Books (
    ISBN INT PRIMARY KEY,
    Title VARCHAR(255),
    Author VARCHAR(255),
    Quantity INT,
    Location Int );

INSERT INTO books (ISBN, title, author, quantity, location) VALUES (123, 'Reading Minds', 'James Arthur', 20, 13), (302, 'New Adventures', 'Jane William', 35, 2);

CREATE TABLE Borrowers ( ID SERIAL PRIMARY KEY, Name VARCHAR(255), email VARCHAR(255), rdate DATE );

INSERT INTO Borrowers (name, email, rdate) VALUES ('Ahmed', 'ahmed@gmail.com', '2023-12-1'), ('Mariam', 'mariam@hotmail.com', '2023-12-5');
INSERT INTO borrowers (name, email, rdate) VALUES ('Ahmad', 'a_meligy@gmail.com', '2023-12-3');

INSERT INTO books (ISBN, title, author, quantity, location) VALUES (57 ,'Learning Spanish', 'Julia Henry', 1,  39);
CREATE TABLE borrowingdetails(
   ISBN INT ,
   ID INT,
   CONSTRAINT fk_borrower
    FOREIGN KEY(ID) 
    REFERENCES borrowers(ID),
    CONSTRAINT fk_book
    FOREIGN KEY(ISBN) 
    REFERENCES books(ISBN),
    PRIMARY KEY(ISBN, ID)
);