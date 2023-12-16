const getBorrowers = "SELECT * FROM borrowers";
const getBorrowerByID = "SELECT * FROM borrowers WHERE ID = $1";
const checkEmailExists = "SELECT * FROM borrowers WHERE email = $1 "
const addBorrower = "INSERT INTO borrowers (name, email, rdate) VALUES ($1, $2, $3)";
const deleteBorrower = "DELETE FROM borrowers WHERE id = $1";
const updateBorrower = "UPDATE borrowers SET name = $1, email = $2 WHERE id = $3";

module.exports = {
    getBorrowers,
    getBorrowerByID,
    checkEmailExists,
    addBorrower,
    deleteBorrower,
    updateBorrower,
}
