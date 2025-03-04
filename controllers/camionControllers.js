const Camion = require('../models/Camion');

// Créer un camion
const createCamion = async (req, res) => {
  try {
    const { immatriculation, chauffeurId } = req.body;
    const newCamion = new Camion({ immatriculation, chauffeur: chauffeurId });
    await newCamion.save();
    res.status(201).json({ message: 'Camion créé avec succès', camion: newCamion });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du camion', error: err });
  }
};

// Récupérer tous les camions
const getAllCamions = async (req, res) => {
  try {
    const camions = await Camion.find().populate('chauffeur');
    res.status(200).json(camions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des camions', error: err });
  }
};

// Récupérer un camion par ID
const getCamionById = async (req, res) => {
  try {
    const camion = await Camion.findById(req.params.id).populate('chauffeur');
    if (!camion) return res.status(404).json({ message: 'Camion non trouvé' });
    res.status(200).json(camion);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du camion', error: err });
  }
};

// Mettre à jour un camion
const updateCamion = async (req, res) => {
  try {
    const updatedCamion = await Camion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCamion) return res.status(404).json({ message: 'Camion non trouvé' });
    res.status(200).json({ message: 'Camion mis à jour avec succès', camion: updatedCamion });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du camion', error: err });
  }
};

// Supprimer un camion
const deleteCamion = async (req, res) => {
  try {
    const deletedCamion = await Camion.findByIdAndDelete(req.params.id);
    if (!deletedCamion) return res.status(404).json({ message: 'Camion non trouvé' });
    res.status(200).json({ message: 'Camion supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du camion', error: err });
  }
};

module.exports = { createCamion, getAllCamions, getCamionById, updateCamion, deleteCamion };
