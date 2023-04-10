import {Router} from 'express'
import {crearUser,loginUser} from '../controllers/userController.js'

const userRoutes = Router()

userRoutes.post('/create',crearUser)
userRoutes.post('/login',loginUser)

export default userRoutes