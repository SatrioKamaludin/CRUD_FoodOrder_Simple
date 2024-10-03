const FoodService = require('../services/foodService');
const multer = require('multer');

const upload = multer();

class FoodController {
    static async addFood(req, res) {
        const { food_name, food_price, stock } = req.body;
        const errors = [];
        if (!food_name || food_name.trim() === '') {
            errors.push('Name is required');
        }
        if (isNaN(food_price) || food_price < 0 || !food_price) {
            errors.push('Price must be a positive number');
        }
        if (isNaN(stock) || stock < 0 || !stock) {
            errors.push('Stock must be a positive number');
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        try {
            const food = await FoodService.addFood(food_name, food_price, stock);
            res.status(201).json(food);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getFoods(req, res) {
        const { page = 1, itemsPerPage = 10, search = '', sort = 'idAsc' } = req.query;
        try {
            const foods = await FoodService.getFoods(page, itemsPerPage, search, sort);
            return res.json(foods);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getFood(req, res) {
        const { id } = req.params;
        try {
            const food = await FoodService.getFood(id);
            return res.json(food);
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    static async updateFood(req, res) {
        const { id } = req.params;
        const { food_name, food_price, stock } = req.body;

        const errors = [];
        if (isNaN(food_price) || food_price < 0) {
            errors.push('Price must be a positive number');
        }
        if (isNaN(stock) || stock < 0) {
            errors.push('Stock must be a positive number');
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        try {
            const food = await FoodService.updateFood(id, food_name, food_price, stock);
            return res.status(200).json({ message: `Food ${id} has been updated successfully`, food });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteFood(req, res) {
        const { id } = req.params;
        try {
            await FoodService.deleteFood(id);
            return res.status(404).json({ error: 'Food not found' });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { FoodController, upload };