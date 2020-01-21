const express = require('express');
const router = express.Router();

/**
 * @route POST api/users
 * @desc Register a new user
 * @access Public
 */
router.post('/', (req, res) => {
  res.send('&');
});

module.exports = router;
