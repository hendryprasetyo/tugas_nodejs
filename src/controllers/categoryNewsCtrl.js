const joi = require('joi')
const { errorHandler, handleResponseSuccess } = require('../helpers')
const { CategoriesNews, Users } = require('../models')

exports.createCategoryNews = async (req, res) => {
  try {
    const newData = req.body
    const authData = req.user
    const schema = joi.object({
      name: joi.string().min(3).lowercase().required(),
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
    const category = await CategoriesNews.findOne({
      where: { name: newData.name },
    })
    if (category)
      return errorHandler(res, 400, 'Bad request', 'Category already exists')

    await CategoriesNews.create({ ...newData, createdBy: authData.id })

    return handleResponseSuccess(
      res,
      201,
      'Created',
      'Category news created successfully!'
    )
  } catch (error) {
    return errorHandler(res)
  }
}
exports.getCategoriesNews = async (req, res) => {
  try {
    const { count, rows } = await CategoriesNews.findAndCountAll({
      include: [{ model: Users, as: 'created', attributes: ['firstName'] }],
    })

    return handleResponseSuccess(res, 200, 'Ok', { count, results: rows })
  } catch (error) {
    console.log(error)
    return errorHandler(res)
  }
}
