'use strict'
const { Model } = require('sequelize')
const { hashPassword } = require('../utils/bcryptPassword')

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.News, {
        as: 'author',
        foreignKey: {
          name: 'authorId',
        },
      })
      Users.hasMany(models.CategoriesNews, {
        as: 'created',
        foreignKey: {
          name: 'createdBy',
        },
      })
    }
  }

  Users.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
      tokenResetPassword: DataTypes.STRING,
      resetPasswordExp: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: user => {
          user.password = hashPassword(user.password)
        },
        beforeUpdate: user => {
          if (user.changed) {
            user.password = hashPassword(user.password)
          }
        },
      },
      sequelize,
      modelName: 'Users',
    }
  )

  return Users
}
