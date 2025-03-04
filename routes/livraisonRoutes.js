const express = require('express');
const router = express.Router();
const Livraison = require('../models/Livraison'); // Modèle de livraison
const authMiddleware = require('../middlewares/authMiddleware'); // Import du middleware d'authentification

// Route pour obtenir toutes les livraisons
router.get('/', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const livraisons = await Livraison.find();
    res.status(200).json(livraisons);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des livraisons', error: err });
  }
});

// Route pour obtenir une livraison par ID
router.get('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const livraison = await Livraison.findById(req.params.id);
    if (!livraison) return res.status(404).send('Livraison non trouvée');
    res.status(200).json(livraison);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la livraison', error: err });
  }
});

// Route pour ajouter une nouvelle livraison
router.post('/', authMiddleware, async (req, res) => {  // Protection avec le middleware
  const { date, camionId, chauffeurId, bouteillesDepart, bouteillesRetour, consignes, salaireCalculé } = req.body;
  try {
    const newLivraison = new Livraison({
      date,
      camionId,
      chauffeurId,
      bouteillesDepart,
      bouteillesRetour,
      consignes,
      salaireCalculé
    });
    await newLivraison.save();
    res.status(201).json(newLivraison);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création de la livraison', error: err });
  }
});

// Route pour mettre à jour une livraison
router.put('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const updatedLivraison = await Livraison.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLivraison) return res.status(404).send('Livraison non trouvée');
    res.status(200).json(updatedLivraison);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la livraison', error: err });
  }
});

// Route pour supprimer une livraison
router.delete('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const deletedLivraison = await Livraison.findByIdAndDelete(req.params.id);
    if (!deletedLivraison) return res.status(404).send('Livraison non trouvée');
    res.status(200).json(deletedLivraison);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la livraison', error: err });
  }
});

module.exports = router;
