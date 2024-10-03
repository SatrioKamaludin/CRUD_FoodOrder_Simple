const express = require('express');
const { CustomerController, upload: customerUpload } = require('./app/controllers/customerController');
const { FoodController, upload: foodUpload } = require('./app/controllers/foodController');
const { TransactionController, upload: transactionUpload } = require('./app/controllers/transactionController');
const sequelize = require('./app/config/database');
require('dotenv').config();

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

//Basic Get Endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Customer Routes
app.get('/customers', CustomerController.getCustomers);
app.get('/customers/:id', CustomerController.getCustomer);
app.post('/customers', customerUpload.none(), CustomerController.addCustomer);
app.put('/customers/:id', customerUpload.none(), CustomerController.updateCustomer);
app.delete('/customers/:id', CustomerController.deleteCustomer);

//Food Routes
app.get('/foods', FoodController.getFoods);
app.get('/foods/:id', FoodController.getFood);
app.post('/foods', foodUpload.none(), FoodController.addFood);
app.put('/foods/:id', foodUpload.none(), FoodController.updateFood);
app.delete('/foods/:id', FoodController.deleteFood);

//Transaction Routes
app.get('/transactions', TransactionController.getTransactions);
app.post('/transactions', transactionUpload.none(), TransactionController.addTransaction);
app.put('/transactions/:id', transactionUpload.none(), TransactionController.updateTransaction);
app.delete('/transactions/:id', TransactionController.deleteTransaction);

sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}).catch((error) => {
    console.log('Unable to sync the database', error);
})