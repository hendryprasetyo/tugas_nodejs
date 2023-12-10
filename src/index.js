const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const Routes = require('./routes/index')

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api', Routes)

app.get('/', (req, res) => {
  res.send('API is running ...')
})

app.all('*', (req, res) => {
  res.status(404).json({ message: 'URL Not Found', status: 404 })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
