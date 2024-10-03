const TransactionService = require('../services/transactionService');
const multer = require('multer');

const upload = multer();

class TransactionController {
    static async addTransaction(req, res) {
        const { customer_id, food_id, qty } = req.body;
        const errors = [];

        if (!customer_id) {
            errors.push('Customer ID is required');
        }

        if (!food_id) {
            errors.push('Food ID is required');
        }

        if (!qty) {
            errors.push('Quantity is required');
        }

        if (isNaN(qty) || qty < 1) {
            errors.push('Quantity must be more than 0');
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        try {
            const transaction = await TransactionService.addTransaction(customer_id, food_id, qty);
            res.status(201).json(transaction);
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    static async getTransactions(req, res) {
        const { page = 1, itemsPerPage = 10, sort = 'idAsc', customer_id, food_id } = req.query;
        try {
            const transactions = await TransactionService.getTransactions(page, itemsPerPage, sort, customer_id, food_id);
            return res.json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateTransaction(req, res) {
        const { id } = req.params;
        let { customer_id, food_id, qty } = req.body;
        const errors = [];

        // Convert empty strings to undefined
        if (customer_id === '') customer_id = undefined;
        if (food_id === '') food_id = undefined;
        if (qty === '') qty = undefined;

        if (qty !== undefined && (isNaN(qty) || qty < 0)) {
            errors.push('Quantity must be more than 0');
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        try {
            const transaction = await TransactionService.updateTransaction(id, customer_id, food_id, qty);
            console.log(`Transaction ${id} updated successfully`, transaction);
            return res.status(200).json({ message: `Transaction ${id} updated successfully`, transaction });
        } catch (error) {
            // console.error('Error updating transaction:', error); // Debug log
            if (error.status) {
                return res.status(error.status).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteTransaction(req, res) {
        const { id } = req.params;
        try {
            await TransactionService.deleteTransaction(id);
            return res.status(200).json({ message: 'Transaction ' + id + ' has been deleted successfully' });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { TransactionController, upload };