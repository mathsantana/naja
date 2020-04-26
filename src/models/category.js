"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 50],
            msg: "O nome deve conter mais de um caractere.",
          },
        },
      },
    },
    {}
  );
  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      foreignKey: "idCategory",
    });
  };
  return Category;
};
