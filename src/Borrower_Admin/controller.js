const pool = require('../../db')
const queries = require('./queries')

// Function to get all borrowers in the system
const getBorrowers = (req, res) => {
    pool.query(queries.getBorrowers, (error, results) => {
        if (error) throw error ;
        res.status(200).json(results.rows);
    })
};

// Function handling adding/registering a new borrower/user to the system
const addBorrower = (req, res) => {
    const {name, email, rdate} = req.body ;
        
    //Make sure that the email is not taken before by another borrower/user
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("This email already exists. Try another one.");
        }
        else{
            pool.query(queries.addBorrower, [name, email, rdate], (error, results) => {
                if (error) throw error ;
                res.status(201).send("User registered successfully");
            })
        }
    })
};

// Function handling deleting a user/borrower from the system
const deleteBorrower = (req, res) => {
    const { id } = req.body;
    
    pool.query(queries.getBorrowerByID, [id], (error, results) => {
        if(!results.rows.length){
            res.send("User doesn't exist in the database !");
        }
        else{
            pool.query(queries.checkBorrower, [id], (error, results) => {
                if(error) throw error;
                if(results.rows.length){
                    pool.query(queries.deleteFromBorrowingDetails, [id], (error, results) => {
                        if(error) throw error;
                    })
                }
            })
            pool.query(queries.deleteBorrower, [id], (error, results) => {
                if (error) throw error ;
                res.status(200).send("User deleted successfully")
            })
        }
    })
}

// Function handling updating the info of an existing user/borrower
const updateBorrower = (req, res) => {
    const {id, name, email} = req.body ;

    pool.query(queries.getBorrowerByID, [id], (error, results) => {
        if(!results.rows.length){
            res.send("User doesn't exist in the database !");
        }
        else{
            pool.query(queries.updateBorrower, [name, email, id], (error, results) => {
                if (error) throw error ;
                res.status(200).send("User updated successfully");
            })
        }
    })
}

// Function to get a borrower with a certain ID
const getBorrowerByID = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getBorrowerByID, [id], (error, results) => {
        if (error) throw error ;
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getBorrowers,
    addBorrower,
    deleteBorrower,
    updateBorrower,
    getBorrowerByID,
}
