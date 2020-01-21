const express = require('express');
const router = express.Router();

/**
 * @route GET api/auth
 * @desc Get logged in user
 * @access Private
 */
router.get('/', (req, res) => {
  res.send('&');
});

/**
 * @route POST api/auth
 * @desc Log a user in
 * @access Public
 */
router.post('/', (req, res) => {
  res.send('&');
});

module.exports = router;
