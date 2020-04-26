"use strict";
const { Category } = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      picture: DataTypes.STRING,
      value: { type: DataTypes.DECIMAL(10, 2) },
      quantity: DataTypes.INTEGER,
    },
    {}
  );
  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      as: "category",
      foreignKey: "idCategory",
    });
  };
  return Product;
};
