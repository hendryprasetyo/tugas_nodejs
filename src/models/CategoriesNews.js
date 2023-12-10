'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CategoriesNews extends Model {
    static associate(models) {
      CategoriesNews.hasMany(models.News, {
        as: 'category',
        foreignKey: {
          name: 'categoryId',
        },
      })
      CategoriesNews.belongsTo(models.Users, {
        as: 'created',
        foreignKey: {
          name: 'createdBy',
        },
      })
    }
  }
  CategoriesNews.init(
    {
      name: DataTypes.STRING,
      createdBy: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'CategoriesNews',
    }
  )
  return CategoriesNews
}
