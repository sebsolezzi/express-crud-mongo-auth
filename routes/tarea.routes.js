import {Router} from 'express'
import {crearTarea} from '../controllers/tareaController.js'
import verificarToken from '../middlewares/auth.js'

const rutasTareas = Router()

rutasTareas.post('/crear',verificarToken,crearTarea)

export default rutasTareas