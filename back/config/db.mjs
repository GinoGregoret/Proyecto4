import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    "ventas",
    "user",
    "password",
    {
        dialect:'mysql',
        host:'localhost',
        port: 3306
    }   
)