const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Admin', 'Contrôleur', 'Chauffeur'], 
    default: 'Chauffeur' 
  },  // Ajout du rôle Chauffeur
});

const User = mongoose.model('User', userSchema);

module.exports = User;
