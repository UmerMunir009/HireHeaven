'use strict';
const { Model ,Sequelize} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }

  User.init({
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
    }
  }, {
    sequelize,
    modelName: "User",
    tableName: "users",
    createdAt: "created",
    updatedAt: "updated",
    deletedAt: "deleted",
    timestamps: true,
    paranoid: true,
  });

  return User;
};