import express from "express"
import "dotenv/config"
import cors from "cors"
import { sequelize } from './config/db.mjs'
<<<<<<< HEAD
import { authRoutes } from "./routes/auth.mjs"
import { productRoutes } from "./routes/product.mjs"
import { User } from './models/user.mjs'
import bcrypt from 'bcrypt'

const PORT = process.env.PORT ?? 3000
=======
import { userRoutes } from "./routes/user.mjs"
import { productRoutes } from "./routes/products.mjs"

const PORT = process.argv[2] ?? 3000
>>>>>>> 89fd79582082601478b022b27c832740c478f0c4
const app = express()

app.use(cors())
app.use(express.json())

// Rutas de autenticación
<<<<<<< HEAD
app.use("/api/auth", authRoutes)
=======
app.use("/api/auth", userRoutes)
>>>>>>> 89fd79582082601478b022b27c832740c478f0c4

// Rutas de productos
app.use("/api/products", productRoutes)

<<<<<<< HEAD
app.get('/', (req, res) => {
  res.json({ message: 'API backend funcionando. Rutas: /api/auth, /api/products' })
})

app.listen(PORT, async () => {
  try {
    console.log('Intentando conectar a la base de datos...')
    console.log('Configuración:', {
      database: process.env.NAME_DB,
      host: process.env.HOST_DB,
      port: process.env.PORT_DB,
      dialect: process.env.DIALECT_DB
    })
    
    await sequelize.sync() // sincroniza y crea tablas si no existen
    console.log("Base de datos conectada y tablas sincronizadas")

    // Si no existe ningún usuario, crear un usuario administrador por defecto
    try {
      const userCount = await User.count()
      if (userCount === 0) {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
        const adminPass = process.env.ADMIN_PASS || 'admin123'
        const adminName = process.env.ADMIN_NAME || 'Admin'
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(adminPass, salt)
        await User.create({ fullName: adminName, email: adminEmail, hash })
        console.log(`Usuario administrador creado: ${adminEmail} (usa la contraseña de ADMIN_PASS)`)
      }
    } catch (seedErr) {
      console.error('Error al comprobar/crear usuario administrador:', seedErr)
    }
=======
app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log("Base de datos conectada")
>>>>>>> 89fd79582082601478b022b27c832740c478f0c4
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  } catch (error) {
    console.log("Hubo un error en la conexión a la base de datos:", error)
  }
<<<<<<< HEAD
})
=======
})
>>>>>>> 89fd79582082601478b022b27c832740c478f0c4
