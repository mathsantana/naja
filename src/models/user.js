"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 255],
            msg: "Insira um nome válido (3 ou mais carateres).",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Insira um email válido.",
          },
        },
      },
      password: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
