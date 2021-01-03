"use strict";

module.exports = (sequelize, DataTypes) => {
  var Music = sequelize.define('Music', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    file: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    view: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false
    },
    creater: {
      type: DataTypes.STRING(50)
    },
    image: {
      type: DataTypes.STRING(200)
    }
  }, {
    timestamps: true
  });
  return Music;
};