const express = require('express');
const chauffeurController = require('../controllers/chauffeurControllers');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Import du middleware d'authentification

// Récupérer tous les chauffeurs
router.get('/', authMiddleware, chauffeurController.getAllChauffeurs); 

// Récupérer un chauffeur par son ID
router.get('/:id', authMiddleware, chauffeurController.getChauffeurById);

// Créer un nouveau chauffeur
router.post('/', authMiddleware, chauffeurController.createChauffeur);  

// Mettre à jour un chauffeur
router.put('/:id', authMiddleware, chauffeurController.updateChauffeur);

// Supprimer un chauffeur
router.delete('/:id', authMiddleware, chauffeurController.deleteChauffeur);

module.exports = router;
