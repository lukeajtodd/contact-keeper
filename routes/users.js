const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const User = require('../models/User');

/**
 * @route POST api/users
 * @desc Register a new user
 * @access Public
 */
router.post(
  '/',
  [
    check('name', 'Please enter your name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = await User.create({
        name,
        email,
        password
      });

      // `genSalt` defaults to 10 rounds
      const salt = await bcrypt.genSalt();

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.status(200).json({ msg: `Successfully created user with ${email}` });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
