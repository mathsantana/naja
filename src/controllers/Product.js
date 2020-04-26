const { Product } = require("../models");

module.exports = {
  async create(req, res) {
    const {
      name,
      idCategory,
      description,
      picture,
      value,
      quantity,
    } = req.body;

    try {
      const newProduct = await Product.create({
        name,
        idCategory,
        description,
        picture,
        value,
        quantity,
      });

      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async list(req, res) {
    const products = await Product.findAll({
      include: { association: "category" },
      order: [["quantity", "ASC"]],
    });

    return res.status(200).json(products);
  },
};
