const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Skill extends Model {}

  Skill.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    skillName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proficiency: {
      type: DataTypes.ENUM('Beginner', 'Intermediate', 'Expert'),
      defaultValue: 'Intermediate',
    },
    __v: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    deleted: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Skill',
    tableName: 'skills',
    timestamps: false, 
    paranoid: true,   
    deletedAt: 'deleted',
  });

  return Skill;
};