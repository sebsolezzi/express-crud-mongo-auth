import {Router} from 'express'
import {crearUsuario,loginUsuario} from '../controllers/usuarioController.js'

const rutasUsuario = Router()

rutasUsuario.post('/crear',crearUsuario)
rutasUsuario.post('/login',loginUsuario)

export default rutasUsuario