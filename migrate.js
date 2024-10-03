const sequelize = require('./app/config/database');
const { Customer, Food, Transaction } = require('./app/models/association');

const migrate = async () => {
    try {
        await sequelize.sync({ force: true }); // force: true will drop the table if it already exists
        console.log('Drop and re-sync db.'); 
    } catch (error) {
        console.log('Unable to sync the database',error);
    } finally {
        await sequelize.close();
    }
}

migrate();