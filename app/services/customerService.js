const Customer = require('../models/customer');

class CustomerService {
    static async getCustomers(page = 1, itemsPerPage = 10, search = '', sort = 'nameAsc') {
        const offset = (page - 1) * itemsPerPage;
        const where = search ? { name: { [Op.like]: `%${search}%` } } : {};

        const sortOptions = {
            nameAsc: ['name', 'ASC'],
            nameDesc: ['name', 'DESC'],
            addressAsc: ['address', 'ASC'],
            addressDesc: ['address', 'DESC'],
            phoneAsc: ['phone', 'ASC'],
            phoneDesc: ['phone', 'DESC'],
        };
        
        const order = sortOptions[sort] || sortOptions.nameAsc;

        try {
            const customers = await Customer.findAndCountAll({
                where,
                limit: itemsPerPage,
                offset: offset,
                order: [order],
            });
            return {
                totalItems: customers.count,
                totalPages: Math.ceil(customers.count / itemsPerPage),
                currentPage: page,
                customers: customers.rows,
            };
        } catch (error) {
            console.log('Error getting Customers: ', error);
            throw error;
        }
    }

    static async getCustomer(id) {
        try {
            const customer = await Customer.findByPk(id);
            return customer;
        } catch (error) {
            console.log('Error getting Customer: ', error);
            throw error;
        }
    }

    static async addCustomer(name, address, phone) {
        try {
            const customer = await Customer.create({ name, address, phone });
            return customer;
        } catch (error) {
            console.log('Error adding Customer: ', error);
            throw error;
        }
    }

    static async updateCustomer(id, name, address, phone) {
        try {
            const customer = await Customer.findByPk(id);
            if (customer) {
                if (name !== undefined && name !== '') customer.name = name;
                if (address !== undefined && address !== '') customer.address = address;
                if (phone !== undefined && phone !== '') customer.phone = phone;
                await customer.save();
                return customer;
            }
            return null;
        } catch (error) {
            console.log('Error updating Customer: ', error);
            throw error;
        }
    }

    static async deleteCustomer(id) {
        try {
            const customer = await Customer.findByPk(id);
            if (customer) {
                await customer.destroy();
                return customer;
            }
            return null;
        } catch (error) {
            console.log('Error deleting Customer: ', error);
            throw error;
        }
    }
}

module.exports = CustomerService;