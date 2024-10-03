const CustomerService = require('../services/customerService');
const multer = require('multer');

const upload = multer();

class CustomerController {
    static async addCustomer(req, res) {
        const { name, address, phone } = req.body;
        try {
            if (name === '') {
                return res.status(400).json({ error: 'Name is required' });
            }
            const customer = await CustomerService.addCustomer(name, address, phone);
            res.status(201).json(customer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCustomers(req, res) {
        const { page = 1, itemsPerPage = 10, search = '', sort = 'idAsc' } = req.query;
        try {
            const customers = await CustomerService.getCustomers(page, itemsPerPage, search, sort);
            return res.json(customers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCustomer(req, res) {
        const { id } = req.params;
        try {
            const customer = await CustomerService.getCustomer(id);
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            } else {
                return res.json(customer);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateCustomer(req, res) {
        const { id } = req.params;
        const { name, address, phone } = req.body;
        try {
            const customer = await CustomerService.updateCustomer(id, name, address, phone);
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            } else {
                return res.status(200).json({ message: `Customer ${id} has been updated successfully`, customer });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteCustomer(req, res) {
        const { id } = req.params;
        try {
            const customer = await CustomerService.deleteCustomer(id);
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            } else {
                return res.status(200).json({ message: 'Customer ' + id + ' has been deleted successfully' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { CustomerController, upload };