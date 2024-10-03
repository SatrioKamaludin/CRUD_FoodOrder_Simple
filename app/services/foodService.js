const Food = require('../models/food');
const { Op } = require('sequelize');

class FoodService {
    static async getFoods(page = 1, itemsPerPage = 10, search = '', sort = 'idAsc') {
        const offset = (page - 1) * itemsPerPage;

        const searchTerm = search || '';

        const where = searchTerm ? { food_name: { [Op.iLike]: `%${search}%` } } : {};

        console.log('Search Term:', searchTerm); // Log the search term to verify
        console.log('Where Clause:', where); // Log the where clause to debug

        const sortOptions = {
            idAsc: ['food_id', 'ASC'],
            idDesc: ['food_id', 'DESC'],
            nameAsc: ['food_name', 'ASC'],
            nameDesc: ['food_name', 'DESC'],
            priceAsc: ['food_price', 'ASC'],
            priceDesc: ['food_price', 'DESC'],
            stockAsc: ['stock', 'ASC'],
            stockDesc: ['stock', 'DESC'],
        };

        const order = sortOptions[sort] ? sortOptions[sort] : sortOptions.idAsc;

        try {
            const foods = await Food.findAndCountAll({
                where,
                limit: itemsPerPage,
                offset: offset,
                order: [order],
            });
            return {
                totalItems: foods.count,
                totalPages: Math.ceil(foods.count / itemsPerPage),
                currentPage: page,
                foods: foods.rows,
            };
        } catch (error) {
            console.log('Error getting Food: ', error);
            throw error;
        }
    }

    static async getFood(id) {
        try {
            const food = await Food.findByPk(id);
            if (!food) {
                const error = new Error('Food not found');
                error.status = 404;
                throw error;
            }
            return food;
        } catch (error) {
            console.log('Error getting Food: ', error);
            throw error;
        }
    }

    static async addFood(food_name, food_price, stock) {
        try {
            const food = await Food.create({ food_name, food_price, stock });
            return food;
        } catch (error) {
            console.log('Error adding Food: ', error);
            throw error;
        }
    }

    static async updateFood(id, food_name, food_price, stock) {
        try {
            const food = await Food.findByPk(id);
            if (!food) {
                const error = new Error('Food not found');
                error.status = 404;
                throw error;
            }
            if (food_name !== undefined && food_name !== '') food.food_name = food_name;
            if (food_price !== undefined && food_price !== '') food.food_price = food_price;
            if (stock !== undefined && stock !== '') food.stock = stock;
            await food.save();
            return food;
        } catch (error) {
            console.log('Error updating Food: ', error);
            throw error;
        }
    }

    static async deleteFood(id) {
        try {
            const food = await Food.findByPk(id);
            if (!food) {
                const error = new Error('Food not found');
                error.status = 404;
                throw error;
            }
            return await food.destroy();
        } catch (error) {
            console.log('Error deleting Food: ', error);
            throw error;
        }
    }
}

module.exports = FoodService;