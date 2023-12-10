const { errorHandler } = require('../helpers')

const isAdmin = async (req, res, next) => {
  const { role } = req.user
  if (role !== 1) {
    return errorHandler(res, 403, 'Forbiden', 'You are not an admin')
  } else {
    next()
  }
}
const isEmployee = async (req, res, next) => {
  const { role } = req.user
  if (role !== 2) {
    return errorHandler(res, 403, 'Forbiden', 'You are not an employee')
  } else {
    next()
  }
}

module.exports = { isAdmin, isEmployee }
