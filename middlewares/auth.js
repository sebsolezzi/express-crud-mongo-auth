import jwt from 'jsonwebtoken'

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No hay authorization header' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token invalido' });
    }
};

export default verificarToken