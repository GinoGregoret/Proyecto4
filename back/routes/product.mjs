<<<<<<< HEAD
import express from 'express'
import { Product } from '../models/product.mjs'
import { authenticate } from '../middleware/auth.mjs'

export const productRoutes = express.Router()

// Obtener todos (público)
productRoutes.get('/', async (req, res) => {
  try {
    const products = await Product.findAll()
    return res.json(products)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
})

// Crear producto (protegido)
productRoutes.post('/', authenticate, async (req, res) => {
  const { name, price, stock } = req.body
  if (!name || price == null || stock == null) return res.status(400).json({ message: 'Faltan datos' })
  try {
    const p = await Product.create({ name, price, stock })
    return res.status(201).json(p)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
})

// Editar producto (protegido)
productRoutes.put('/:id', authenticate, async (req, res) => {
  const id = req.params.id
  try {
    const p = await Product.findByPk(id)
    if (!p) return res.status(404).json({ message: 'Producto no encontrado' })
    const { name, price, stock } = req.body
    await p.update({ name: name ?? p.name, price: price ?? p.price, stock: stock ?? p.stock })
    return res.json(p)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
})

// Borrar producto (protegido)
productRoutes.delete('/:id', authenticate, async (req, res) => {
  const id = req.params.id
  try {
    const p = await Product.findByPk(id)
    if (!p) return res.status(404).json({ message: 'Producto no encontrado' })
    await p.destroy()
    return res.json({ message: 'Eliminado' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
})
=======
import { Router } from "express"
import { Product } from "../models/Product.mjs"
import { verifyToken } from '../middleware/auth.mjs'

export const productRoutes = Router()

// GET - Obtener todos los productos (PÚBLICO - sin login)
productRoutes.get("/", async (req, res) => {
  try {
    const products = await Product.findAll()
    res.json({
      error: false,
      data: products
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "No se pudieron cargar los productos"
    })
  }
})

// GET - Obtener un producto por ID (PÚBLICO)
productRoutes.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id }
    })
    
    if (!product) {
      return res.status(404).json({
        error: true,
        msg: "Producto no encontrado"
      })
    }

    res.json({
      error: false,
      product
    })

  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Hubo un error en el servidor"
    })
  }
})

// POST - Crear producto (PROTEGIDO - requiere login)
productRoutes.post("/", verifyToken, async (req, res) => {
  try {
    const body = req.body
    
    if (!body.name || !body.price || !body.stock) {
      return res.status(400).json({
        error: true,
        msg: "Todos los campos son obligatorios"
      })
    }
    
    const product = new Product({
      name: body.name,
      price: Number(body.price),
      stock: Number(body.stock)
    })
    
    await product.save()
    
    res.json({
      error: false,
      msg: "Producto creado exitosamente",
      product
    })
    
  } catch (err) {
    res.status(500).json({
      error: true,
      msg: err.message
    })
  }
})

// PUT - Actualizar producto (PROTEGIDO - requiere login)
productRoutes.put("/:id", verifyToken, async (req, res) => {
  try {
    const body = req.body
    const product = await Product.findOne({
      where: { id: req.params.id }
    })

    if (!product) {
      return res.status(404).json({
        error: true,
        msg: "No se puede actualizar, el producto no existe"
      })
    }

    product.name = body.name
    product.stock = body.stock
    product.price = body.price

    await product.save()

    res.json({
      error: false,
      msg: "Producto actualizado exitosamente",
      product
    })

  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Ocurrió un error al actualizar"
    })
  }
})

// DELETE - Eliminar producto (PROTEGIDO - requiere login)
productRoutes.delete("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)
    
    if (!product) {
      return res.status(404).json({
        error: true,
        msg: "Producto no encontrado"
      })
    }
    
    await product.destroy()

    res.json({
      error: false,
      msg: "Producto eliminado exitosamente"
    })
    
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Ocurrió un error al eliminar"
    })
  }
})
>>>>>>> 89fd79582082601478b022b27c832740c478f0c4
