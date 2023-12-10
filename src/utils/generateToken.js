const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const generateAccessToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET)
}
const generateResetPasswordToken = () => {
  return (resettoken = crypto.randomBytes(32).toString('hex'))
}
module.exports = { generateAccessToken, generateResetPasswordToken }
