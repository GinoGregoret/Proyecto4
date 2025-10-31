import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(
  "stock",
  "root",
  "",
  {
    dialect: "mysql",
    host: "localhost",
    port: 3306
  })