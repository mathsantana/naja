const { Category } = require('../models');

module.exports = {
  async index(req, res) {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) return res.status(400).json({ msg: 'Categoria não existe' });

    return res.status(200).json(category);
  },
  async create(req, res) {
    const { name } = req.body;

    try {
      const newCategory = await Category.create({ name });

      return res.status(201).json(newCategory);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async list(req, res) {
    const categories = await Category.findAll({});

    return res.status(200).json(categories);
  },
  async update(req, res) {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) return res.status(400).json({ msg: 'Categoria não existe' });

    const updatedCategory = await category.update(req.body);

    return res.json(updatedCategory);
  },

  async delete(req, res) {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) return res.status(400).json({ msg: 'Categoria não existe' });

    await category.destroy();

    return res.json({
      message: `Category with id ${id} was deleted.`,
      userMessage: 'Categoria deletada com sucesso.',
    });
  },
};
