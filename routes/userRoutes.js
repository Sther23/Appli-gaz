const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

// GET tous les utilisateurs
router.get('/', getAllUsers);

// GET un utilisateur par ID
router.get('/:id', authMiddleware, getUserById);

// POST créer un utilisateur
router.post('/', createUser);

// PUT mettre à jour un utilisateur
router.put('/:id', authMiddleware, updateUser);

// DELETE supprimer un utilisateur
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
