import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";

const Imprest = sequelize.define("imprest", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(256),
  },
  phone_number_1: {
    type: DataTypes.STRING, 
  },
  extension_1: {
    type: DataTypes.STRING(5), 
  },
  phone_number_2: {
    type: DataTypes.STRING,
  },
  extension_2: {
    type: DataTypes.STRING(5),
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
  },
  modified_by: {
    type: DataTypes.INTEGER,
  },
});

export default Imprest;
