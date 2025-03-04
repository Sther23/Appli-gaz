const express = require('express');
const chauffeurController = require('../controllers/chauffeurControllers');
const router = express.Router();

// Récupérer tous les chauffeurs
router.get('/', chauffeurController.getAllChauffeurs);

// Récupérer un chauffeur par son ID
router.get('/:id', chauffeurController.getChauffeurById);

// Créer un nouveau chauffeur
router.post('/', chauffeurController.createChauffeur);

// Mettre à jour un chauffeur
router.put('/:id', chauffeurController.updateChauffeur);

// Supprimer un chauffeur
router.delete('/:id', chauffeurController.deleteChauffeur);

module.exports = router;
