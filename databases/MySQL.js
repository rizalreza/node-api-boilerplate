// import sequelize
const { Sequelize } = require('sequelize');

// create connection
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: console.log,
        pool: {
            max: 50,
            min: 10,
            acquire: 60000,
            idle: 10000,
        },
        dialectOptions: {
            // @see https://github.com/sequelize/sequelize/issues/8019
            maxPreparedStatements: 100
        },
    }
);
// export connection
module.exports = db;
