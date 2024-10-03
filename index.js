const express = require('express');
const { CustomerController, upload } = require('./app/controllers/customerController');
const { FoodController } = require('./app/controllers/foodController');
require('dotenv').config();

const app = express();
const port = process.env.port || 3000;


//Basic Get Endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Customer Routes
app.get('/customers', CustomerController.getCustomers);
app.get('/customers/:id', CustomerController.getCustomer);
app.post('/customers', upload.none(), CustomerController.addCustomer);
app.put('/customers/:id', upload.none(), CustomerController.updateCustomer);
app.delete('/customers/:id', CustomerController.deleteCustomer);

//Food Routes
app.get('/foods', FoodController.getFoods);
app.get('/foods/:id', FoodController.getFood);
app.post('/foods', upload.none(), FoodController.addFood);
app.put('/foods/:id', upload.none(), FoodController.updateFood);
app.delete('/foods/:id', FoodController.deleteFood);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})