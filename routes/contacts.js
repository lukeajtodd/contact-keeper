const express = require('express');
const router = express.Router();

/**
 * @route GET api/contacts
 * @desc Get contacts for a user
 * @access Private
 */
router.get('/', (req, res) => {
  res.send('&');
});

/**
 * @route POST api/contacts
 * @desc Add a contact for a user
 * @access Private
 */
router.post('/', (req, res) => {
  res.send('&');
});

/**
 * @route DELETE api/contacts/:id
 * @desc Delete a contact for a user by id
 * @access Private
 */
router.delete('/', (req, res) => {
  res.send('&');
});

/**
 * @route PUT api/contacts/:id
 * @desc Update a contact for a user by id
 * @access Private
 */
router.put('/', (req, res) => {
  res.send('&');
});

module.exports = router;
