import express from "express"
import dotenv from "dotenv"
import { sequelize } from './config/db.mjs'
import { Product } from "./models/products.mjs"
import cors from 'cors'
import { where } from "sequelize"
// Crear servidor Express
const app = express()
dotenv.config()

app.use(express.json())

app.use(cors())
// Para obtener productos
app.get("/", async function(req, res) {
  try {
    const products = await Product.findAll()
    res.json({
      error: false,
      data: products
    })
  } catch {
    res.json({
      error: true,
      msg: "No se pudieron cargar los productos"
    })
  }


})
// Para crear o agregar producto
app.post('/', async (req, res) => {

  try {
    const body = req.body
    if (Object.values(body).includes("")) {
      res.json({
        error: true,
        msg: "Todos los campos son obligatorios"
      })
      return
    }
    const product = new Product({
      name: body.name,
      price: Number(body.price),
      stock: Number(body.stock)
    })
    await product.save()
    res.json({
      error: false,
      msg: "Producto cargado master"
    })
  } catch (err) {
    res.json({
      error: true,
      msg: err.message
    })
  }

})


// Para modificar producto
app.get("/product", async (req, res) => {
  const query = req.query
  try {
    const product = await Product.findOne({
      where: {
        id: query.id
      }
    })
    if (!product) {
      res.status(404).json({
        error: true,
        msg: "No se encontro el producto"
      })
      return
    }

    res.json({
      error: false,
      product: product
    })

  } catch {
    res.status(500).json({
      error: true,
      msg: "Hay un error en el servidor"
    })
  }


})
app.put("/", async (req, res) => {

  const query = req.query
  const body = req.body

  try {
    const product = await Product.findOne({
      where: {
        id: query?.id
      }
    })

    if (!product) {
      res.status(404).json({
        error: true,
        msg: "No se puede actualizar, porque no existe"
      })
      return
    }

    product.name = body.name
    product.stock = body.stock
    product.price = body.price

    await product.save()

    res.json({
      error: false,
      msg: "Producto ha sido actualizado"
    })


  } catch {
    res.status(500).json({
      error: true,
      msg: "Error al actualizar"
    })
  }

})

// Para eliminar un producto
app.delete("/", async (req, res) => {
  const query = req.query
  
  try {
    const product = await Product.findByPk(query.id)
    await product.destroy()

    res.json({
      error: false,
      msg: "Producto eliminado"
    })
  } catch {
    res.status(500).json({
      error: true,
      msg: "Ocurrio un error"
    })
  }
})

// Iniciar servidor express
app.listen(3000, () => {
  console.log("servidor iniciado en puerto http://localhost:3000")
  sequelize.sync()
})

