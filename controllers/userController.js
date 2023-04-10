import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/models.js'

export const crearUser = async (req, res) => {

    const { username, password } = req.body;

    if (username == '' || password == '') {
        return res.status(404).send({ msg: 'Enter a username and password' })
    }

    try {

        const existUser = await User.findOne({ username })

        if (existUser) {
            return res.status(404).send({ msg: 'Username is already used' })
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashpassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.status(200).json({ msg: 'User created', token });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server problem" });
    }

}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (username == '' || password == '') {
        return res.status(404).send({ msg: 'Enter a username and password' })
    }

    try {

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).send({ msg: 'Incorrect username or password' })
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) { 
            return res.status(404).send({ msg: 'Incorrect username or password' }) 
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.status(200).json({ token });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server problem" });
    }
}


