const express = require('express')
const router = express.Router()

const Authenticated = require('../middleware/authentication')
const { isAdmin, isEmployee } = require('../middleware/authorization')
const {
  createEmployee,
  updateEmployeeProfileById,
  getEmployeeById,
} = require('../controllers/userCtrl')

router.post('/user/employee', Authenticated, isAdmin, createEmployee)
router.put(
  '/user/employee/:employeeId',
  Authenticated,
  isEmployee,
  updateEmployeeProfileById
)
router.get('/user/employee/:employeeId', Authenticated, getEmployeeById)

module.exports = router
