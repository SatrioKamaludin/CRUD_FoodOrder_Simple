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
            if (!food) {
                return res.status(404).json({ error: 'Food not found' });
            } else {
                return res.json(food);
            }
        } catch (error) {
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
            if (!food) {
                return res.status(404).json({ error: 'Food not found' });
            } else {
                return res.status(200).json({ message: `Food ${id} has been updated successfully`, food });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteFood(req, res) {
        const { id } = req.params;
        try {
            const food = await FoodService.deleteFood(id);
            if (!food) {
                return res.status(404).json({ error: 'Food not found' });
            } else {
                return res.status(200).json({ message: 'Food ' + id + ' has been deleted successfully' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { FoodController, upload };