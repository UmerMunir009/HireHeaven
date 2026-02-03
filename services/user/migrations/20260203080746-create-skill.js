'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('skills', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
      },
      skillName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      proficiency: {
        type: Sequelize.ENUM('Beginner', 'Intermediate', 'Expert'),
        defaultValue: 'Intermediate'
      }, 
      __v: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      deleted: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), 
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('skills');
  }
};