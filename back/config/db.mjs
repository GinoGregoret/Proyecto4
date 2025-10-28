import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.NAME_DB,
    {
        host: process.env.HOST_DB,
        port: process.env.PORT_DB,
        dialect: process.env.DIALECT_DB
    }
)