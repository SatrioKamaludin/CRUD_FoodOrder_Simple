const express = require('express');
const { CustomerController, upload } = require('./app/controllers/customerController');
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})