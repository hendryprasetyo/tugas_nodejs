const joi = require('joi')
const {
  errorHandler,
  handleResponseSuccess,
  responsepagination,
} = require('../helpers')
const { News, CategoriesNews, Users } = require('../models')

exports.createNews = async (req, res) => {
  try {
    const newData = req.body
    const authData = req.user
    const schema = joi.object({
      title: joi.string().min(10).required(),
      shortDescription: joi.string().min(10).required(),
      description: joi.string().min(20).required(),
      image: joi.string().uri().required(),
      categoryId: joi.number().positive().required(),
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

    const category = await CategoriesNews.findByPk(newData.categoryId)
    if (!category)
      return errorHandler(res, 404, 'Not found', 'Category news not found')

    await News.create({ ...newData, authorId: authData.id })

    return handleResponseSuccess(
      res,
      201,
      'Created',
      'News created successfully!'
    )
  } catch (error) {
    return errorHandler(res)
  }
}
exports.getNews = async (req, res) => {
  try {
    const { pageNumber = 1, pageSize = 20 } = req.query
    const { count, rows } = await News.findAndCountAll({
      include: [
        {
          model: CategoriesNews,
          as: 'category',
          attributes: ['name', 'createdBy'],
        },
        {
          model: Users,
          as: 'author',
          attributes: ['firstName'],
        },
      ],
      offset: Number(pageSize) * (Number(pageNumber) - 1),
      limit: Number(pageSize),
    })
    const { next, previous } = responsepagination(
      rows,
      pageNumber,
      pageSize,
      '/news'
    )
    return handleResponseSuccess(res, 200, 'Ok', {
      count,
      next,
      previous,
      results: rows,
    })
  } catch (error) {
    return errorHandler(res)
  }
}
exports.getNewsById = async (req, res) => {
  try {
    const { newsId } = req.params
    const newsDetail = await News.findByPk(newsId, {
      include: [
        {
          model: CategoriesNews,
          as: 'category',
          attributes: ['name', 'createdBy'],
        },
        {
          model: Users,
          as: 'author',
          attributes: ['firstName'],
        },
      ],
    })
    if (!newsDetail)
      return errorHandler(res, 404, 'Not Found', 'News not found')
    return handleResponseSuccess(res, 200, 'Ok', newsDetail)
  } catch (error) {
    return errorHandler(res)
  }
}

exports.updateNewsById = async (req, res) => {
  try {
    const newData = req.body
    const { newsId } = req.params
    const authData = req.user
    const schema = joi.object({
      title: joi.string().min(10).required(),
      shortDescription: joi.string().min(10).required(),
      description: joi.string().min(20).required(),
      image: joi.string().uri().required(),
      categoryId: joi.number().positive().required(),
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
    const newsDetail = await News.findByPk(newsId)
    if (!newsDetail)
      return errorHandler(res, 404, 'Not found', 'News not found')

    const category = await CategoriesNews.findByPk(newData.categoryId)

    if (newsDetail.authorId !== authData.id)
      return errorHandler(
        res,
        400,
        'Bad request',
        'you are not the author of this news'
      )

    if (!category)
      return errorHandler(res, 404, 'Not found', 'Category news not found')
    await News.update(newData, {
      where: {
        id: newsId,
      },
    })
    return handleResponseSuccess(
      res,
      200,
      'Updated',
      'News updated successfully'
    )
  } catch (error) {
    return errorHandler(res)
  }
}

exports.deleteNewsById = async (req, res) => {
  try {
    const { newsId } = req.params
    const authData = req.user
    const newsDetail = await News.findByPk(newsId)
    if (!newsDetail)
      return errorHandler(res, 404, 'Not Found', 'News not found')

    if (newsDetail.authorId !== authData.id)
      return errorHandler(
        res,
        400,
        'Bad request',
        'you are not the author of this news'
      )

    await News.destroy({ where: { id: newsId } })

    return handleResponseSuccess(
      res,
      200,
      'Deleted',
      'News deleted successfully'
    )
  } catch (error) {
    return errorHandler(res)
  }
}
