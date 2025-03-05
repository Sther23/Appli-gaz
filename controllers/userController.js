const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Création d'un utilisateur avec retour de token
const createUser = async (req, res) => {
  try {
      const { nom, prenom, email, motDePasse, role } = req.body;

      const newUser = new User({ nom, prenom, email, motDePasse, role });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({ 
          message: 'Utilisateur créé avec succès',
          user: newUser,
          token: token  // On renvoie le token directement ici
      });

  } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: err.message });
  }
};

// Lire tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err.message });
    }
};

// Lire un utilisateur par ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: err.message });
    }
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error: err.message });
    }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: err.message });
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
