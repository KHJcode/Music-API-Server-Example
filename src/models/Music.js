module.exports = (sequelize, DataTypes) => {

  const Music = sequelize.define('Music', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    file: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    view: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
    creater: {
      type: DataTypes.STRING(50),
    },
  }, {
    timestamps: true,
  });

  return Music;
};
