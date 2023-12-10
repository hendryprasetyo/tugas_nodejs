'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'tokenResetPassword', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn('Users', 'resetPasswordExp', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'tokenResetPassword'),
      queryInterface.removeColumn('Users', 'resetPasswordExp'),
    ])
  },
}
