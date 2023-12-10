const joi = require('joi')
const crypto = require('crypto')
const {
  errorHandler,
  handleResponseSuccess,
  resetBodyEmail,
} = require('../helpers')
const { Users } = require('../models')
const { comparePassword } = require('../utils/bcryptPassword')
const {
  generateAccessToken,
  generateResetPasswordToken,
} = require('../utils/generateToken')
const sendEmail = require('../utils/sendEmail')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
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
    if (!user) return errorHandler(res, 404, 'Bad request', 'User not found')
    const isMatch = comparePassword(password, user.password)
    if (!isMatch)
      return errorHandler(res, 400, 'Bad request', 'Invalid Password')

    const token = generateAccessToken(user.id, user.role)

    return handleResponseSuccess(res, 200, 'Ok', { token })
  } catch (error) {
    return errorHandler(res)
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const schema = joi.object({
      email: joi.string().email().required(),
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

    if (!user) {
      return errorHandler(
        res,
        404,
        'Not Found',
        'User with this email is not found'
      )
    }
    const token = generateResetPasswordToken()
    await Users.update(
      {
        tokenResetPassword: crypto
          .createHash('sha256')
          .update(token)
          .digest('hex'),
        resetPasswordExp: Date.now() + 5 * 60 * 1000, // 5 menit
      },
      {
        where: {
          id: user.id,
        },
      }
    )
    const data = {
      to: email,
      text: `Hey ${user?.firstName}`,
      subject: 'Reset Your Password',
      htm: resetBodyEmail(user, token),
    }
    sendEmail(data)
    return handleResponseSuccess(res, 200, 'Ok', { token })
  } catch (error) {
    return errorHandler(res)
  }
}
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body
    const { token } = req.params

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await Users.findOne({
      where: {
        tokenResetPassword: hashedToken,
      },
    })

    if (!user) return errorHandler(res, 400, 'Bad Request', 'Invalid token')
    const formatDateExp = parseInt(user.resetPasswordExp, 10)
    const resetExpDate = new Date(formatDateExp)
    const now = new Date()

    if (resetExpDate < now) {
      return errorHandler(res, 400, 'Bad Request', 'Token expired')
    }
    const schema = joi.object({
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
    user.password = password
    user.tokenResetPassword = null
    user.resetPasswordExp = null
    await user.save()
    return handleResponseSuccess(
      res,
      200,
      'Updated',
      'Password updated successsfully'
    )
  } catch (error) {
    return errorHandler(res)
  }
}
