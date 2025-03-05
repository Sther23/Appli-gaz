const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./utils/logger');

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://Noshut:MolM6G44fBFOoY24@cluster0.8tbnh.mongodb.net/gestiongaz')
  .then(() => logger.info('MongoDB connecté'))
  .catch(err => logger.error('Erreur MongoDB', err));

// Importation des routes
const userRoutes = require('./routes/userRoutes');
const camionRoutes = require('./routes/camionRoutes');
const bouteilleRoutes = require('./routes/bouteilleRoutes');
const livraisonRoutes = require('./routes/livraisonRoutes');
const chauffeurRoutes = require('./routes/chauffeurRoutes');
const authRoutes = require('./routes/authRoutes');  

// Utilisation des routes
app.use('/api/utilisateurs', userRoutes);
app.use('/api/camions', camionRoutes);
app.use('/api/bouteilles', bouteilleRoutes);
app.use('/api/livraisons', livraisonRoutes);
app.use('/api/chauffeurs', chauffeurRoutes);
app.use('/api/auth', authRoutes);  // <-- Ajouter ici pour le login

// Lancer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => logger.info(`Serveur démarré sur port ${port}`));
