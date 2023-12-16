const Router = require('express');
const controller = require('./controller');
const router = Router();

router.get('/', controller.getBorrowers);
router.post('/add', controller.addBorrower);
router.delete('/', controller.deleteBorrower);
router.put('/update', controller.updateBorrower);
router.get('/:id', controller.getBorrowerByID);

module.exports = router;