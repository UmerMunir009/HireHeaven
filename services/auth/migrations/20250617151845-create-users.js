'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM('job_seeker', 'recruiter'),
        defaultValue: 'job_seeker',
        allowNull: false,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      resume: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resume_public_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile_pic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile_pic_public_key: {
        type: Sequelize.STRING,
        allowNull: true,
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
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};