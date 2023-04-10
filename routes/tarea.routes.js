import { Router } from 'express'
import { crearTarea, obtenerTareas,editarTarea,obtenerTarea,eliminarTarea } from '../controllers/tareaController.js'
import verificarToken from '../middlewares/auth.js'

const rutasTareas = Router()

rutasTareas.post('/crear', verificarToken, crearTarea)
rutasTareas.get('/listar', verificarToken, obtenerTareas)
rutasTareas.get('/tarea/:id', verificarToken, obtenerTarea)
rutasTareas.put('/editar/:id',verificarToken,editarTarea)
rutasTareas.delete('/borrar/:id',verificarToken,eliminarTarea)

export default rutasTareas