Requirements:
1. NodeJS
2. PostgreSQL 13.16 or Above
3. Postman

How to use:
1. Clone this repository
2. Open the cloned repo and run "npm install" via terminal
3. In PosgreSQL's pgAdmin4, create a new database named food_order
4. Obtain postgreSQL configs (username, address, port, password, database), create .env file and set the configs:

    PGHOST=address
    PGUSER=username
    PGPASSWORD=password
    PGDATABASE=database
    PGPORT=port

5. Run "node migrate" to migrate tables to food_order database
6. Run "node index.js" to run the app.
7. Use postman to play with the API

API LIST
1. Customer APIs
   - Add Customer
     > curl --location 'http://localhost:3000/customers' \
--form 'name=""' \
--form 'address=""' \
--form 'phone=""'
   - Update Customer
     > curl --location --request PUT 'http://localhost:3000/customers/{id}' \
--form 'name=""' \
--form 'address=""' \
--form 'phone=""'
   - Delete Customer
     > curl --location --request DELETE 'http://localhost:3000/customers/{id}'
   - Get Customers (with params for search, paginations, sort, etc)
     > curl --location 'http://localhost:3000/customers?page=&itemsPerPage=&sort=&search='
     
     > sort: idAsc, idDesc, nameAsc, nameDesc.
   - Get Customer by Id
     > curl --location 'http://localhost:3000/customers/{id}'
3. Food APIs
   - Add Food
     > curl --location 'http://localhost:3000/foods' \
--form 'food_name=""' \
--form 'food_price=""' \
--form 'stock=""'
   - Update Food
     > curl --location --request PUT 'http://localhost:3000/foods/{id}' \
--form 'food_name=""' \
--form 'food_price=""' \
--form 'stock=""'
   - Delete Food
     > curl --location --request DELETE 'http://localhost:3000/foods/{id}'
   - Get Food (with params for search, paginations, sort, etc)
     > curl --location 'http://localhost:3000/foods?page=&itemsPerPage=&search=&sort='
     
     > sort: idAsc, idDesc, nameAsc, nameDesc, priceAsc, priceDesc, stockAsc, stockDesc.
   - Get Food by Id
     > curl --location 'http://localhost:3000/foods/{id}'
5. Transaction APIs
   - Add Transaction
     > curl --location 'http://localhost:3000/transactions' \
--form 'customer_id=""' \
--form 'food_id=""' \
--form 'qty=""'
   - Update Transaction
     > curl --location --request PUT 'http://localhost:3000/transactions/{id}' \
--form 'customer_id=""' \
--form 'food_id=""' \
--form 'qty=""'
   - Delete Transaction
     > curl --location --request DELETE 'http://localhost:3000/transactions/1'
   - Get Transaction (with params for search, paginations, sort, etc)
     > curl --location 'http://localhost:3000/transactions?page=&itemsPerPage=&search=&sort=&customer_id=&food_id='

     > sort: idAsc, idDesc, priceAsc, priceDesc, qtyAsc, qtyDesc.
