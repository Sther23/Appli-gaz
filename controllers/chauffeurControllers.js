const Chauffeur = require('../models/chauffeur');
const logger = require('../utils/logger');

// Récupérer tous les chauffeurs
exports.getAllChauffeurs = async (req, res) => {
  try {
    const chauffeurs = await Chauffeur.find().populate('utilisateur');
    res.status(200).json(chauffeurs);
  } catch (err) {
    logger.error('Erreur lors de la récupération des chauffeurs', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des chauffeurs', error: err });
  }
};

// Récupérer un chauffeur par son ID
exports.getChauffeurById = async (req, res) => {
  try {
    const chauffeur = await Chauffeur.findById(req.params.id).populate('utilisateur');
    if (!chauffeur) return res.status(404).json({ message: 'Chauffeur non trouvé' });
    res.status(200).json(chauffeur);
  } catch (err) {
    logger.error('Erreur lors de la récupération du chauffeur', err);
    res.status(500).json({ message: 'Erreur lors de la récupération du chauffeur', error: err });
  }
};

// Créer un nouveau chauffeur
exports.createChauffeur = async (req, res) => {
  const { nom, prenom, email, telephone, salaire, utilisateur } = req.body;
  try {
    const newChauffeur = new Chauffeur({ nom, prenom, email, telephone, salaire, utilisateur });
    await newChauffeur.save();
    res.status(201).json(newChauffeur);
  } catch (err) {
    logger.error('Erreur lors de la création du chauffeur', err);
    res.status(400).json({ message: 'Erreur lors de la création du chauffeur', error: err });
  }
};

// Mettre à jour un chauffeur
exports.updateChauffeur = async (req, res) => {
  try {
    const updatedChauffeur = await Chauffeur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedChauffeur) return res.status(404).json({ message: 'Chauffeur non trouvé' });
    res.status(200).json(updatedChauffeur);
  } catch (err) {
    logger.error('Erreur lors de la mise à jour du chauffeur', err);
    res.status(400).json({ message: 'Erreur lors de la mise à jour du chauffeur', error: err });
  }
};

// Supprimer un chauffeur
exports.deleteChauffeur = async (req, res) => {
  try {
    const deletedChauffeur = await Chauffeur.findByIdAndDelete(req.params.id);
    if (!deletedChauffeur) return res.status(404).json({ message: 'Chauffeur non trouvé' });
    res.status(200).json(deletedChauffeur);
  } catch (err) {
    logger.error('Erreur lors de la suppression du chauffeur', err);
    res.status(500).json({ message: 'Erreur lors de la suppression du chauffeur', error: err });
  }
};
