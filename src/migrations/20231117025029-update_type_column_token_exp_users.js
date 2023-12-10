'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Users', 'resetPasswordExp', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'resetPasswordExp'),
    ])
  },
}
