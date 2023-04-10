import { Router } from 'express'
import { createTask,editTask,deleteTask,getTask,getTasks } from '../controllers/taskController.js'
import verifyToken from '../middlewares/auth.js'

const taskRoutes = Router()

taskRoutes.post('/create', verifyToken, createTask)
taskRoutes.get('/list', verifyToken, getTasks)
taskRoutes.get('/task/:id', verifyToken, getTask)
taskRoutes.put('/edit/:id',verifyToken,editTask)
taskRoutes.delete('/delete/:id',verifyToken,deleteTask)

export default taskRoutes