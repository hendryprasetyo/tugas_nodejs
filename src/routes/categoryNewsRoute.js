const express = require('express')
const router = express.Router()

const Authenticated = require('../middleware/authentication')
const { isAdmin } = require('../middleware/authorization')
const {
  createCategoryNews,
  getCategoriesNews,
} = require('../controllers/categoryNewsCtrl')

router.post('/category-news', Authenticated, isAdmin, createCategoryNews)
router.get('/categories-news', getCategoriesNews)

module.exports = router
