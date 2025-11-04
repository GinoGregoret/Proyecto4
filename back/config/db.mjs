import { Sequelize } from "sequelize"
<<<<<<< HEAD
import dotenv from "dotenv"
dotenv.config()

const config = {
  database: process.env.NAME_DB || 'stock_utn',
  username: process.env.USER_DB || 'root',
  password: process.env.PASS_DB || '',
  options: {
    host: process.env.HOST_DB || 'localhost',
    port: process.env.PORT_DB ? Number(process.env.PORT_DB) : 3306,
    dialect: process.env.DIALECT_DB || 'mysql',
    logging: console.log
  }
}

console.log('Configuración de base de datos:', {
  ...config,
  password: config.password ? '****' : ''
})

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options
)
=======

export const sequelize = new Sequelize(
  process.env.NAME_DB,
  process.env.USER_DB,
  process.env.PASS_DB,
  {
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    dialect: process.env.DIALECT_DB
  }
)
>>>>>>> 89fd79582082601478b022b27c832740c478f0c4
