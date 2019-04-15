const personModel = require ('../models/contacts.model')
const ServerError = require('../libs/errors');
const log = require('../services/log.service');
const { check, validationResult } = require('express-validator/check');

module.exports = {

  arrayOfValidation: [
  check('firstName').not().isEmpty().trim(),
  check('lastName').not().isEmpty().trim(),
  check('phone').not().isEmpty().trim(),
  ],

  validationFields: (req, res, next) => {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    } else next();
  },

  newContact: (req, res, next) => {
    personModel.create(req.body)
    .then(personSaved => res.status(201).json({person: personSaved}))
    .catch(next);
  },

  getAllContacts: (req, res, next) => {
    const query = req.query.lastName || '';
    personModel.find({ lastName: { $regex: query.toLowerCase().trim(),  $options: 'ig' }})
    .then(persons => {
      if (!persons.length) throw new ServerError(404, 'Contacts not founded');
      res.json(persons);
    })
    .catch(next);
  },

  getContactById: (req, res, next) => {
    personModel.findById({_id: req.params.id})
    .then(person => {
      if (!person) throw new ServerError(404, 'Contact not found');
      res.json(person);
    })
    .catch(next);
  },

  updateContact: (req, res, next) => {
    personModel.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(person => {
      if (!person) throw new ServerError(404, 'Contact not found');
      res.status(200).json(person);
    })
    .catch(next);
  },

  removeContact: (req, res, next) => {
    personModel.findByIdAndRemove({_id: req.params.id})
    .then(person => {
      if (!person) throw new ServerError(404, 'Contact not found');
      res.status(200).json(`Person with id = ${req.params.id} removed from contacts`);
    })
    .catch(next); 
  }

}