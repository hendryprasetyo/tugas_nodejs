const express = require('express')
const router = express.Router()

const Authenticated = require('../middleware/authentication')
const { isEmployee } = require('../middleware/authorization')
const {
  createNews,
  getNews,
  updateNewsById,
  getNewsById,
  deleteNewsById,
} = require('../controllers/newsCtrl')

router.post('/news/post', Authenticated, isEmployee, createNews)

router.put('/news/:newsId', Authenticated, isEmployee, updateNewsById)

router.get('/news/:newsId', getNewsById)
router.get('/news', getNews)

router.delete('/news/:newsId', Authenticated, isEmployee, deleteNewsById)

module.exports = router
