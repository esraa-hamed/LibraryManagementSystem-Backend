const express = require('express');

const bookRoutes = require('./src/Book/routes');

const borrowerRoutes = require('./src/Borrower/routes');

const borrowerAdminRoutes = require('./src/Borrower_Admin/routes');

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res)=>{
    res.send('connected to localhost 3000');
});

app.use('/api/admin/books', bookRoutes);
app.use('/api/admin/borrowers', borrowerAdminRoutes);
app.use('/api/user', borrowerRoutes);

app.listen(port, () => console.log('app listening on port', port) );

