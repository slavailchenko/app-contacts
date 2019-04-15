const router = require('express').Router();
const { check } = require('express-validator/check');
const contacts = require ('../controllers/contacts.controller');

router.get('/', contacts.getAllContacts);
router.get('/:id', contacts.getContactById);
router.post('/', contacts.arrayOfValidation, contacts.validationFields, contacts.newContact);
router.put('/:id', contacts.arrayOfValidation, contacts.validationFields, contacts.updateContact);
router.delete('/:id', contacts.removeContact);

module.exports = router;