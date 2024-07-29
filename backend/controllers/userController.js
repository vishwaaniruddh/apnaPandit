const User = require('../models/userModel');

const userController = {
  register: (req, res) => {
    const { name, email, password } = req.body;
    User.create({ name, email, password }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  },
  
  welcome:(req,res)=>{
    res.status(201).json({ message: 'Hello Aniruddh',});
  }

  // Additional controllers like login, profile update, etc., can be defined here
};

module.exports = userController;
