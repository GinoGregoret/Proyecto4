import { DataTypes } from "sequelize"
import { sequelize } from "../config/db.mjs"

export const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  hash: { type: DataTypes.STRING, allowNull: false },
  isActivate: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'users'
})
