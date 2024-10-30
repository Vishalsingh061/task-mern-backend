const express = require('express')
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/current', protect, getCurrentUser)

module.exports = router;