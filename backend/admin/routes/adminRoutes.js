const express = require('express');
const router = express.Router();
const panditController = require('../controllers/panditController');
const categoryController = require('../controllers/categoryController');
const { body } = require('express-validator');

// Routes for Pandits management
// router.post('/pandits', panditController.addPandit);

router.get('/pandits', panditController.getAllPandits);
router.post('/pandits', [
    body('fname').notEmpty().withMessage('First name is required'),
    body('primaryContact').isMobilePhone().withMessage('Valid primary contact is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    // Add more validations as needed
  ], panditController.addPandit);
router.get('/pandits/:id', panditController.getPanditById);
router.put('/pandits/:id', panditController.updatePandit);
router.post('/pandits/:panditId/status', panditController.updatePanditStatus);


// Routes for Categories management
router.post('/categories', categoryController.addCategory);
router.get('/categories', categoryController.getAllCategories);

// Additional admin routes can be added here

module.exports = router;
