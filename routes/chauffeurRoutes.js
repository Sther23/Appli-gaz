const express = require('express');
const chauffeurController = require('../controllers/chauffeurControllers');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Import du middleware d'authentification

// Récupérer tous les chauffeurs
router.get('/', authMiddleware, chauffeurController.getAllChauffeurs);  // Protection avec le middleware

// Récupérer un chauffeur par son ID
router.get('/:id', authMiddleware, chauffeurController.getChauffeurById);  // Protection avec le middleware

// Créer un nouveau chauffeur
router.post('/', authMiddleware, chauffeurController.createChauffeur);  // Protection avec le middleware

// Mettre à jour un chauffeur
router.put('/:id', authMiddleware, chauffeurController.updateChauffeur);  // Protection avec le middleware

// Supprimer un chauffeur
router.delete('/:id', authMiddleware, chauffeurController.deleteChauffeur);  // Protection avec le middleware

module.exports = router;
