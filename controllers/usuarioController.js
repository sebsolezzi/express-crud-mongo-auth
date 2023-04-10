import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Usuario } from '../models/models.js'

export const crearUsuario = async (req, res) => {

    const { username, password } = req.body;

    if (username == '' || password == '') {
        return res.status(404).send({ msg: 'Ingrese un usuario y contraseña' })
    }

    try {

        const existeUsuario = await Usuario.findOne({ username })

        if (existeUsuario) {
            return res.status(404).send({ msg: 'El nómbre de usuario ya está usado' })
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const usuario = new Usuario({ username, password: hashpassword });
        await usuario.save();
        const token = jwt.sign({ id: usuario._id }, process.env.SECRET_KEY);
        res.status(200).json({ msg: 'Usuario crado', token });

    } catch (error) {
        console.log(error)
        return res.status(404).send({ msg: 'Error al crear usuario', err: error })
    }

}

export const loginUsuario = async (req, res) => {
    const { username, password } = req.body;

    if (username == '' || password == '') {
        return res.status(404).send({ msg: 'Ingrese un usuario y contraseña' })
    }

    try {

        const usuario = await Usuario.findOne({ username })

        if (!usuario) {
            return res.status(404).send({ msg: 'nombre de usuario o contraseña incorrecta' })
        }

        const match = await bcrypt.compare(password, usuario.password);

        if (!match) { 
            return res.status(404).send({ msg: 'nombre de usuario o contraseña incorrecta' }) 
        }

        const token = jwt.sign({ id: usuario._id }, process.env.SECRET_KEY);
        res.status(200).json({ token });

    } catch (error) {
        console.log(error)
    }
}


