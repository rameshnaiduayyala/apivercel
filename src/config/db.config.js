import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 5432,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false
  //   }
  // },
  define: {
    freezeTableName: true
  },
  
  
});

export default sequelize