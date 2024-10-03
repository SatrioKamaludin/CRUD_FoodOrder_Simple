const Customer = require('./customer');
const Food = require('./food');
const Transaction = require('./transaction');

Customer.hasMany(Transaction, { foreignKey: 'customer_id' });
Transaction.belongsTo(Customer, { foreignKey: 'customer_id' });

Food.hasMany(Transaction, { foreignKey: 'food_id' });
Transaction.belongsTo(Food, { foreignKey: 'food_id' });

module.exports = { Customer, Food, Transaction };