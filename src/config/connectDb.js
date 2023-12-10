const { development } = require('./database')
const { Sequelize } = require('sequelize')

// Membuat koneksi menggunakan konfigurasi development
const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    dialect: development.dialect,
  }
)
module.exports = sequelize
