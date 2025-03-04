const express = require('express');
const router = express.Router();
const Camion = require('../models/Camion'); // Modèle de camion
const authMiddleware = require('../middlewares/authMiddleware'); // Import du middleware d'authentification

// Route pour obtenir tous les camions
router.get('/', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const camions = await Camion.find();
    res.status(200).json(camions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des camions', error: err });
  }
});

// Route pour obtenir un camion par ID
router.get('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const camion = await Camion.findById(req.params.id);
    if (!camion) return res.status(404).send('Camion non trouvé');
    res.status(200).json(camion);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du camion', error: err });
  }
});

// Route pour ajouter un nouveau camion
router.post('/', authMiddleware, async (req, res) => {  // Protection avec le middleware
  const { immatriculation, chauffeurId } = req.body;
  try {
    const newCamion = new Camion({ immatriculation, chauffeurId });
    await newCamion.save();
    res.status(201).json(newCamion);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création du camion', error: err });
  }
});

// Route pour mettre à jour un camion
router.put('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const updatedCamion = await Camion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCamion) return res.status(404).send('Camion non trouvé');
    res.status(200).json(updatedCamion);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du camion', error: err });
  }
});

// Route pour supprimer un camion
router.delete('/:id', authMiddleware, async (req, res) => {  // Protection avec le middleware
  try {
    const deletedCamion = await Camion.findByIdAndDelete(req.params.id);
    if (!deletedCamion) return res.status(404).send('Camion non trouvé');
    res.status(200).json(deletedCamion);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du camion', error: err });
  }
});

module.exports = router;
