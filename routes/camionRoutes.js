const express = require('express');
const router = express.Router();
const Camion = require('../models/Camion');
const authMiddleware = require('../middlewares/authMiddleware'); 
const {createCamion , getAllCamions , getCamionById , updateCamion, deleteCamion} = require ('../controllers/bouteilleController');


// Route pour obtenir tous les camions
router.get('/', getAllCamions);

router.get('/:id', authMiddleware, getCamionById);

router.post('/', createCamion);

router.put('/:id', authMiddleware, updateCamion);

router.delete('/:id', authMiddleware, deleteCamion);

module.exports = router;