const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./customer');
const Food = require('./food');

const Transaction = sequelize.define('transaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'customer_id'
        }
    },
    food_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Food,
            key: 'food_id'
        }
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.INTEGER
    },
    transaction_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'transactions'
});

module.exports = Transaction;