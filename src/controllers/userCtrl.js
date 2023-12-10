const joi = require('joi')
const { errorHandler, handleResponseSuccess } = require('../helpers')
const { Users } = require('../models')

exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    const schema = joi.object({
      firstName: joi.string().min(3).required(),
      lastName: joi.string().min(3).optional(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      confirmPassword: joi
        .string()
        .min(6)
        .valid(joi.ref('password'))
        .required()
        .messages({
          'any.only': 'Password and Confirm Password must match',
        }),
    })
    const { error } = schema.validate(req.body)
    if (error) {
      return errorHandler(
        res,
        400,
        'Validation Failed',
        error.details[0].message
      )
    }
    const user = await Users.findOne({ where: { email } })
    if (user)
      return errorHandler(res, 400, 'Bad Request', 'User Already exists')
    await Users.create({ firstName, lastName, email, password, role: 2 })

    return handleResponseSuccess(
      res,
      201,
      'Created',
      'Created employee Successfully'
    )
  } catch (error) {
    return errorHandler(res)
  }
}
exports.updateEmployeeProfileById = async (req, res) => {
  try {
    const { employeeId } = req.params
    const authData = req.user

    const newData = req.body
    const schema = joi.object({
      firstName: joi.string().min(3).required(),
      lastName: joi.string().min(3).optional(),
    })
    const { error } = schema.validate(newData)
    if (error) {
      return errorHandler(
        res,
        400,
        'Validation Failed',
        error.details[0].message
      )
    }
    const userDetail = await Users.findByPk(employeeId)
    if (!userDetail)
      return errorHandler(res, 404, 'Not found', 'User not found')

    if (userDetail.id !== authData.id)
      return errorHandler(res, 400, 'Bad request', 'you are not the owner')
    await Users.update(newData, { where: { id: employeeId } })

    return handleResponseSuccess(
      res,
      200,
      'Updated',
      'User Updated sucessfully'
    )
  } catch (error) {
    return errorHandler(res)
  }
}

exports.getEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params
    const authData = req.user
    if (parseInt(employeeId) !== authData.id)
      return errorHandler(res, 404, 'Not found', 'User not found')
    const userDetail = await Users.findByPk(employeeId, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
    })
    if (!userDetail)
      return errorHandler(res, 404, 'Not Found', 'User not found')

    return handleResponseSuccess(res, 200, 'Ok', userDetail)
  } catch (error) {
    return errorHandler(res)
  }
}
