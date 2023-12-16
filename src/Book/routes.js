const Router = require('express');
const controller = require('./controller');
const router = Router();

router.get('/', controller.getBooks);
router.post('/add', controller.addBook);
router.get('/:isbn', controller.getBookByISBN);
router.put('/update', controller.updateBook);
router.delete('/', controller.deleteBook);

module.exports = router;