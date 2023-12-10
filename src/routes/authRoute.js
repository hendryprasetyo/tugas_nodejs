const express = require('express')
const {
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authCtrl')
const router = express.Router()

router.post('/auth/login', login)

router.post('/auth/forgot-password', forgotPassword)

router.patch('/auth/reset-password/:token', resetPassword)

module.exports = router
