const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token reçu:', token);  // log pour voir si tu reçois bien un token

    if (!token) {
        console.log('Aucun token reçu');
        return res.status(401).json({ message: 'Non autorisé' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Utilisateur déchiffré:', req.user);
        next();
    } catch (err) {
        console.log('Erreur JWT:', err);
        res.status(401).json({ message: 'Token invalide' });
    }
};
