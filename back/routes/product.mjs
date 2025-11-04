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
