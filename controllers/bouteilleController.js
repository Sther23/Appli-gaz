const Bouteille = require('../models/Bouteille');

// Créer une bouteille
const createBouteille = async (req, res) => {
  try {
    const { type, statut } = req.body;
    const newBouteille = new Bouteille({ type, statut });
    await newBouteille.save();
    res.status(201).json({ message: 'Bouteille créée avec succès', bouteille: newBouteille });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de la bouteille', error: err });
  }
};

// Récupérer toutes les bouteilles
const getAllBouteilles = async (req, res) => {
  try {
    const bouteilles = await Bouteille.find();
    res.status(200).json(bouteilles);
  } catch (err) {
    console.error('Error fetching bottles:', err); // Ajouter un log détaillé
    res.status(500).json({ message: 'Erreur lors de la récupération des bouteilles', error: err });
  }
};


// Récupérer une bouteille par ID
const getBouteilleById = async (req, res) => {
  try {
    const bouteille = await Bouteille.findById(req.params.id);
    if (!bouteille) return res.status(404).json({ message: 'Bouteille non trouvée' });
    res.status(200).json(bouteille);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la bouteille', error: err });
  }
};

// Mettre à jour une bouteille
const updateBouteille = async (req, res) => {
  try {
    const updatedBouteille = await Bouteille.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBouteille) return res.status(404).json({ message: 'Bouteille non trouvée' });
    res.status(200).json({ message: 'Bouteille mise à jour avec succès', bouteille: updatedBouteille });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la bouteille', error: err });
  }
};

// Supprimer une bouteille
const deleteBouteille = async (req, res) => {
  try {
    const deletedBouteille = await Bouteille.findByIdAndDelete(req.params.id);
    if (!deletedBouteille) return res.status(404).json({ message: 'Bouteille non trouvée' });
    res.status(200).json({ message: 'Bouteille supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la bouteille', error: err });
  }
};

module.exports = { createBouteille, getAllBouteilles, getBouteilleById, updateBouteille, deleteBouteille };
