const { errorHandler } = require('../helpers')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { Users } = require('../models')
const Authenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader) {
      return errorHandler(res, 401, 'Unauthorized', 'authentication required')
    }

    const token = authHeader.split(' ')[1]
    if (token) {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            return errorHandler(
              res,
              403,
              'Forbidden',
              'Token invalid, please login again'
            )
          }
          const user = await Users.findByPk(decoded.id)
          if (!user) return errorHandler(res, 404, 'Not Found', 'User Notfound')
          req.user = user
          next()
        }
      )
    } else {
      return errorHandler(res, 401, 'Unauthorized', 'Token is required')
    }
  } catch (error) {
    return errorHandler(res)
  }
}

module.exports = Authenticated
