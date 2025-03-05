const jwt = require('jsonwebtoken');
const User = require('../models/User');

const loginUser = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;

        // Vérifier que les champs sont remplis
        if (!email || !motDePasse) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis' });
        }

        // Rechercher l'utilisateur dans la base de données
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérification du mot de passe (si hashé, il faut le comparer avec bcrypt.compare)
        if (user.motDePasse !== motDePasse) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Générer le token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Connexion réussie',
            user: {
                _id: user._id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: err.message });
    }
};

module.exports = { loginUser };
