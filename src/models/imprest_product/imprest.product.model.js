import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';
import Product from '../product/product.model.js';
import Imprest from '../imprest/imprest.model.js';

const ImprestProduct = sequelize.define('imprest_product', {
    min_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    available_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    modified_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

ImprestProduct.belongsTo(Imprest, { foreignKey: 'imprest_id' });
ImprestProduct.belongsTo(Product, { foreignKey: 'product_id' });

export default ImprestProduct;