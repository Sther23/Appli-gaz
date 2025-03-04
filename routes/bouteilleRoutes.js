const express = require('express');
const router = express.Router();
const Bouteille = require('../models/Bouteille'); // Modèle de bouteille
const authMiddleware = require('../middlewares/authMiddleware'); // Import du middleware d'authentification

// Route pour obtenir toutes les bouteilles
router.get('/', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const bouteilles = await Bouteille.find();
    res.status(200).json(bouteilles);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des bouteilles', error: err });
  }
});

// Route pour obtenir une bouteille par ID
router.get('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const bouteille = await Bouteille.findById(req.params.id);
    if (!bouteille) return res.status(404).send('Bouteille non trouvée');
    res.status(200).json(bouteille);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la bouteille', error: err });
  }
});

// Route pour ajouter une nouvelle bouteille
router.post('/', authMiddleware, async (req, res) => {  // Protection avec le middleware
  const { type, statut } = req.body;
  try {
    const newBouteille = new Bouteille({ type, statut });
    await newBouteille.save();
    res.status(201).json(newBouteille);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création de la bouteille', error: err });
  }
});

// Route pour mettre à jour une bouteille
router.put('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const updatedBouteille = await Bouteille.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBouteille) return res.status(404).send('Bouteille non trouvée');
    res.status(200).json(updatedBouteille);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la bouteille', error: err });
  }
});

// Route pour supprimer une bouteille
router.delete('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const deletedBouteille = await Bouteille.findByIdAndDelete(req.params.id);
    if (!deletedBouteille) return res.status(404).send('Bouteille non trouvée');
    res.status(200).json(deletedBouteille);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la bouteille', error: err });
  }
});

module.exports = router;
