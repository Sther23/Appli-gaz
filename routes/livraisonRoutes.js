const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    createLivraison,
    getAllLivraisons,
    getLivraisonById,
    updateLivraison,
    deleteLivraison
} = require('../controllers/livraisonControllers');

// Routes
router.get('/', getAllLivraisons);
router.get('/:id', authMiddleware, getLivraisonById);
router.post('/', authMiddleware, createLivraison);
router.put('/:id', authMiddleware, updateLivraison);
router.delete('/:id', authMiddleware, deleteLivraison);

module.exports = router;
