const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.execute(query, [userData.name, userData.email, userData.password], callback);
  },
  
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.execute(query, [email], callback);
  },

  // Additional methods for user operations can be defined here
};

module.exports = User;
