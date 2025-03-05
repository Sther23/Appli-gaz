const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    

    if (!token) {
        return res.status(401).json({ message: 'Accès interdit, token manquant' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // injecter l’utilisateur décodé dans req.user
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalide', error: err.message });
    }
};
