const db = require('../../config/db');

const Category = {
  create: (categoryData, callback) => {
    const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
    db.execute(query, [categoryData.name, categoryData.description], callback);
  },
  
  getAll: (callback) => {
    const query = 'SELECT * FROM categories';
    db.execute(query, callback);
  },

  // Additional methods like update, delete, etc., can be added here
};

module.exports = Category;
