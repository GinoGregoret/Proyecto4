import express from 'express'
import cors from 'cors'

import { sequelize, Sequelize } from './config/db.mjs'
const app = express()
const PORT = process.argv[2] ?? 3000
app.use(cors())
app.use(express.json())


app.listen(PORT, async()=>{
    try{
        await sequelize.sync ({alter:true})
        console.log(`corriendo en el servidor https://localhost:${PORT}`)
    }catch{
        console.log('hubo un error en la base de datos')
    }
})