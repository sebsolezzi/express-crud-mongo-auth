import express from 'express'
import 'dotenv/config'
import rutasUsuario from './routes/user.routes.js'
import taskRoutes from './routes/task.routes.js'
import {conectDB} from './config/db.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use('/user',rutasUsuario)
app.use('/task',taskRoutes)

conectDB()

app.listen (PORT, () =>{
    console.log(`Server running on port: ${PORT}`)
})

app.get('*',(req,res)=>{
    res.status(404).send({msg:'Path not found'})
})