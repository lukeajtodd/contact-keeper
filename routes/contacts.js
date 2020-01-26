const express = require('express');
const { check, validationResult } = require('express-validator');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

const Contact = require('../models/Contact');
const User = require('../models/User');

/**
 * @route GET api/contacts
 * @desc Get contacts for a user
 * @access Private
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });

    if (!contacts.length) {
      return res.json([]);
    }

    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

/**
 * @route POST api/contacts
 * @desc Add a contact for a user
 * @access Private
 */
router.post(
  '/',
  [
    authMiddleware,
    check('name', 'Please enter a name').exists(),
    check('email', 'Please enter a valid email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const contact = await Contact.create({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      await contact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route DELETE api/contacts/:id
 * @desc Delete a contact for a user by id
 * @access Private
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorised: Contact not yours' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact successfully deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route PUT api/contacts/:id
 * @desc Update a contact for a user by id
 * @access Private
 */
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};

  if (name) {
    contactFields.name = name;
  }

  if (email) {
    contactFields.email = email;
  }

  if (phone) {
    contactFields.phone = phone;
  }

  if (type) {
    contactFields.type = type;
  }

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorised: Contact not yours' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields
      },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
