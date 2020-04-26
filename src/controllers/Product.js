const { Product } = require('../models');

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
        description: description || '',
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
      include: { association: 'category' },
      order: [['quantity', 'ASC']],
    });

    return res.status(200).json(products);
  },
  async index(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) return res.status(400).json({ msg: 'Produto não existe' });

    return res.json(product);
  },
  async update(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) return res.status(400).json({ msg: 'Produto não existe' });

    const newProduct = await product.update(req.body);

    return res.json(newProduct);
  },
  async delete(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) return res.status(400).json({ msg: 'Produto não existe' });

    await product.destroy(req.body);

    return res.json({
      message: `Product with id ${id} was deleted.`,
      userMessage: 'Produto deletado com sucesso.',
    });
  },
};
