'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.Users, {
        as: 'author',
        foreignKey: {
          name: 'authorId',
        },
      })
      News.belongsTo(models.CategoriesNews, {
        as: 'category',
        foreignKey: {
          name: 'categoryId',
        },
      })
    }
  }
  News.init(
    {
      title: DataTypes.STRING,
      shortDescription: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      authorId: DataTypes.BIGINT,
      categoryId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'News',
    }
  )
  return News
}
