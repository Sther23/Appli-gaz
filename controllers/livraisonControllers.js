const Livraison = require('../models/Livraison');

// Créer une livraison
const createLivraison = async (req, res) => {
  try {
    const { date, camion, chauffeur, bouteillesDepart, bouteillesRetour, consignes, salaireCalculé } = req.body;
    const newLivraison = new Livraison({ date, camion, chauffeur, bouteillesDepart, bouteillesRetour, consignes, salaireCalculé });
    await newLivraison.save();
    res.status(201).json({ message: 'Livraison créée avec succès', livraison: newLivraison });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de la livraison', error: err });
  }
};

// Récupérer toutes les livraisons
const getAllLivraisons = async (req, res) => {
  try {
    const livraisons = await Livraison.find().populate('camion chauffeur bouteillesDepart bouteillesRetour');
    res.status(200).json(livraisons);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des livraisons', error: err });
  }
};

// Récupérer une livraison par ID
const getLivraisonById = async (req, res) => {
  try {
    const livraison = await Livraison.findById(req.params.id).populate('camion chauffeur bouteillesDepart bouteillesRetour');
    if (!livraison) return res.status(404).json({ message: 'Livraison non trouvée' });
    res.status(200).json(livraison);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la livraison', error: err });
  }
};

// Mettre à jour une livraison
const updateLivraison = async (req, res) => {
  try {
    const updatedLivraison = await Livraison.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLivraison) return res.status(404).json({ message: 'Livraison non trouvée' });
    res.status(200).json({ message: 'Livraison mise à jour avec succès', livraison: updatedLivraison });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la livraison', error: err });
  }
};

// Supprimer une livraison
const deleteLivraison = async (req, res) => {
  try {
    const deletedLivraison = await Livraison.findByIdAndDelete(req.params.id);
    if (!deletedLivraison) return res.status(404).json({ message: 'Livraison non trouvée' });
    res.status(200).json({ message: 'Livraison supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la livraison', error: err });
  }
};

module.exports = { createLivraison, getAllLivraisons, getLivraisonById, updateLivraison, deleteLivraison };
