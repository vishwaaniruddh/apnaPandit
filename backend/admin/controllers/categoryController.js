const Category = require('../models/categoryModel');

const categoryController = {
  addCategory: (req, res) => {
    const { name, description } = req.body;
    Category.create({ name, description }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to add category' });
      }
      res.status(201).json({ message: 'Category added successfully', categoryId: result.insertId });
    });
  },
  
  getAllCategories: (req, res) => {
    Category.getAll((err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve categories' });
      }
      res.status(200).json(results);
    });
  },

  // Additional actions like update, delete, etc., can be added here
};

module.exports = categoryController;
