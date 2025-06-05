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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    work_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    break_start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    break_end_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('1', '2', '3', '4'),
      allowNull: false,
      defaultValue: '1',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'AttendanceRecord',
    tableName: 'attendance_records',
    timestamps: false, // disables Sequelize's automatic timestamps
    paranoid: false,   // set to true if you want Sequelize to handle deleted_at automatically
    underscored: true, // aligns camelCase with snake_case in DB
  });

  return Attendance;
};