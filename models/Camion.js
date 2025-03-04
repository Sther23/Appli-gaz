const mongoose = require('mongoose');

const camionSchema = new mongoose.Schema({
  immatriculation: { type: String, required: true },
  chauffeur: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Référence à l'utilisateur qui est un chauffeur
    required: true 
  },
});

const Camion = mongoose.model('Camion', camionSchema);

module.exports = Camion;
