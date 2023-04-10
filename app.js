import express from 'express'
import 'dotenv/config'
import rutasUsuario from './routes/usuario.routes.js'
import rutasTareas from './routes/tarea.routes.js'
import {conentarDB} from './config/db.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use('/usuario',rutasUsuario)
app.use('/tarea',rutasTareas)

conentarDB()

app.listen (PORT, () =>{
    console.log(`Server corriendo en puerto ${PORT}`)
})

app.get('/',(req,res)=>{
    res.status(202).send({msg:'distponible'})
})

app.get('*',(req,res)=>{
    res.status(404).send({msg:'Ruta no encontrada'})
})