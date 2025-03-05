const express = require('express');
const router = express.Router();
const Bouteille = require('../models/Bouteille');
const authMiddleware = require('../middlewares/authMiddleware');
const {createBouteille , getAllBouteilles , getBouteilleById , updateBouteille , deleteBouteille} = require('../controllers/bouteilleController'); 

// Route pour obtenir toutes les bouteilles
router.get('/', getAllBouteilles);

router.get('/:id', authMiddleware, getBouteilleById);

router.post('/', createBouteille);

router.put('/:id', authMiddleware, updateBouteille);

router.delete('/:id', authMiddleware, deleteBouteille);

module.exports = router;