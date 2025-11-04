import jwt from 'jsonwebtoken'
<<<<<<< HEAD
import dotenv from 'dotenv'
dotenv.config()

export const authenticate = (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ message: 'No token provided' })
  const parts = auth.split(' ')
  if (parts.length !== 2) return res.status(401).json({ message: 'Token error' })
  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Token malformado' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'changeme')
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
=======

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
      return res.status(401).json({
        error: true,
        msg: "No se proporcionó token de autenticación"
      })
    }

    // Formato: "Bearer TOKEN"
    const token = authHeader.split(" ")[1]
    
    if (!token) {
      return res.status(401).json({
        error: true,
        msg: "Token inválido"
      })
    }

    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded
    next()
    
  } catch (error) {
    return res.status(403).json({
      error: true,
      msg: "Token inválido o expirado"
    })
  }
}
>>>>>>> 89fd79582082601478b022b27c832740c478f0c4
