const Customer = require('../models/customer');
const Food = require('../models/food');
const Transaction = require('../models/transaction');
const { Op } = require('sequelize');

class TransactionService {
    static async addTransaction(customer_id, food_id, qty) {
        try {
            const customer = await Customer.findByPk(customer_id);
            if (!customer) {
                const error = new Error('Customer not found');
                error.status = 404;
                throw error;
            }

            const food = await Food.findByPk(food_id);
            if (!food) {
                const error = new Error('Food not found');
                error.status = 404;
                throw error;
            }

            if (food.stock < qty) {
                const error = new Error('Insufficient stock, only ' + food.stock + ' left');
                error.status = 400;
                throw error;
            }

            const total_price = food.food_price * qty;
            const transaction_date = new Date();

            const transaction = await Transaction.create({
                customer_id,
                food_id,
                qty,
                total_price,
                transaction_date
            });

            food.stock -= qty;
            await food.save();
            return transaction;
        } catch (error) {
            throw error;
        }
    }

    static async getTransactions(page = 1, itemsPerPage = 10, sort = 'idAsc', customer_id, food_id) {
        const offset = (page - 1) * itemsPerPage;

        const where = {};

        if (customer_id) {
            where.customer_id = customer_id;
        }

        if (food_id) {
            where.food_id = food_id;
        }

        const sortOptions = {
            idAsc: ['transaction_id', 'ASC'],
            idDesc: ['transaction_id', 'DESC'],
        };

        const order = sortOptions[sort] ? sortOptions[sort] : sortOptions.idAsc;

        try {
            const transactions = await Transaction.findAndCountAll({
                where,
                limit: itemsPerPage,
                offset: offset,
                order: [order],
            });
            return {
                totalItems: transactions.count,
                totalPages: Math.ceil(transactions.count / itemsPerPage),
                currentPage: page,
                transactions: transactions.rows,
            };
        } catch (error) {
            throw error;
        }
    }

    static async updateTransaction(id, customer_id, food_id, qty) {
        try {
            const transaction = await Transaction.findByPk(id);
            if (!transaction) {
                const error = new Error('Transaction not found');
                error.status = 404;
                throw error;
            }

            const customer = customer_id ? await Customer.findByPk(customer_id) : null;
            if (customer_id && !customer) {
                const error = new Error('Customer not found');
                error.status = 404;
                throw error;
            }

            const food = food_id ? await Food.findByPk(food_id) : null;
            if (food_id && !food) {
                const error = new Error('Food not found');
                error.status = 404;
                throw error;
            }

            //handle stock adjustment
            if (qty !== undefined && qty !== '') {
                const originalQty = transaction.qty;
                if (qty > originalQty) {
                    const additionalQty = qty - originalQty;
                    if (food.stock < additionalQty) {
                        const error = new Error('Insufficient stock, only ' + food.stock + ' left');
                        error.status = 400;
                        throw error;
                    }
                    food.stock -= additionalQty;
                } else if (qty < originalQty) {
                    const returnedQty = originalQty - qty;
                    food.stock += returnedQty;
                }
                transaction.qty = qty;
            }

            if (customer_id !== undefined && customer_id !== '') transaction.customer_id = customer_id;
            if (food_id !== undefined && food_id !== '') transaction.food_id = food_id;

            const total_price = food ? food.food_price * (qty || transaction.qty) : transaction.total_price;
            transaction.total_price = total_price;
            const transaction_date = new Date();
            transaction.transaction_date = transaction_date;
            await transaction.save();
            if (food) await food.save();
            return transaction;
        } catch (error) {
            throw error;
        }
    }

    static async deleteTransaction(id) {
        try {
            const transaction = await Transaction.findByPk(id);
            if (!transaction) {
                const error = new Error('Transaction not found');
                error.status = 404;
                throw error;
            }
            return await transaction.destroy();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TransactionService