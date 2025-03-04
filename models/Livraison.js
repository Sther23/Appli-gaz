const mongoose = require('mongoose');

const livraisonSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  camion: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Camion', 
    required: true 
  },
  chauffeur: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Référence à l'utilisateur qui est un chauffeur
    required: true 
  },
  bouteillesDepart: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Bouteille' 
  }],
  bouteillesRetour: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Bouteille' 
  }],
  consignes: { type: String },
  salaireCalculé: { type: Number },
});

const Livraison = mongoose.model('Livraison', livraisonSchema);

module.exports = Livraison;
