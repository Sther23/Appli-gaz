const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assure-toi que le modèle User est bien créé
const authMiddleware = require('../middlewares/authMiddleware'); // Import du middleware d'authentification

// Route pour obtenir tous les utilisateurs
router.get('/', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err });
  }
});

// Route pour obtenir un utilisateur par ID
router.get('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Utilisateur non trouvé');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: err });
  }
});

// Route pour ajouter un nouvel utilisateur
router.post('/', authMiddleware, async (req, res) => {  // Protection avec le middleware
  const { nom, email, role, motDePasse } = req.body;
  try {
    const newUser = new User({ nom, email, role, motDePasse });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur', error: err });
  }
});

// Route pour mettre à jour un utilisateur
router.put('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).send('Utilisateur non trouvé');
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error: err });
  }
});

// Route pour supprimer un utilisateur
router.delete('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send('Utilisateur non trouvé');
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: err });
  }
});

module.exports = router;
