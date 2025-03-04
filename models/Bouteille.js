const mongoose = require('mongoose');

const bouteilleSchema = new mongoose.Schema({
  type: { type: String, enum: ['pleine', 'vide'], required: true },
  statut: { 
    type: String, 
    enum: ['en stock', 'en livraison', 'vendue'], 
    required: true 
  },
});

const Bouteille = mongoose.model('Bouteille', bouteilleSchema);

module.exports = Bouteille;
