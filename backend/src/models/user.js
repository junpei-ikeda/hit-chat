'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class AttendanceRecord extends Model {}

  AttendanceRecord.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false, // disables Sequelize's automatic timestamps
    paranoid: false,   // set to true if you want Sequelize to handle deleted_at automatically
    underscored: true, // aligns camelCase with snake_case in DB
  });

  return Attendance;
};
