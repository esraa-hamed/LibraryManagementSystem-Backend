const Router = require('express');
const controller = require('./controller');
const router = Router();

router.get('/:id', controller.getBorrowerInfo);
router.get('/:id/mybooks', controller.getBooksBorrowed);
router.get('/:id/allbooks', controller.getAllBooks);
router.post('/:id/allbooks/borrow', controller.borrowBook);
router.put('/:id/mybooks/return', controller.returnBook);

module.exports = router;