const mongoose = require('mongoose');

const chauffeurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  salaire: { type: Number, required: true },
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
  dateEmbauche: { type: Date, default: Date.now },
});

const Chauffeur = mongoose.model('Chauffeur', chauffeurSchema);

module.exports = Chauffeur;
