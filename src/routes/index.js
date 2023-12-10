const { Router } = require('express')

const authRoute = require('./authRoute')
const userRoute = require('./userRoute')
const newsRoute = require('./newsRoute')
const categoryNewsRoute = require('./categoryNewsRoute')

const router = Router()

router.use(authRoute)
router.use(userRoute)
router.use(newsRoute)
router.use(categoryNewsRoute)

module.exports = router
