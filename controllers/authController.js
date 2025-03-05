const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.motDePasse !== motDePasse) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
